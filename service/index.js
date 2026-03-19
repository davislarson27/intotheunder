const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
// const { createNewAccount } = require('../src/service');

const authCookieName = "token";

app.use(express.json());
app.use(cookieParser());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;


// ------------------------------------------ stored variables ------------------------------------------ //

userList = [];
commentList = [];


// ------------------------------------------ routes list ------------------------------------------ //
"/auth/create"
"/auth/login"
"/auth/logout"
"/auth/update-data"
"/comments"
"/comments/submit"
"/comments/like"


// --------------------------------------- main functions begin here -------------------------------------- //

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

apiRouter.post('/auth/create', async (req, res) => {

    // create userReturnObject to be returned
    let userObject = {
        user: {
            userName: null,
            userEmail: null,
            lastOSDownloaded: "macsilicon", // macsilicon is the default until they try something else
            lastVersionDownloaded: "n/a",
            userCommentsIDs: []
        },
        error: {
            userNameTaken: false,
            userNameBlocked: false,
            userEmailTaken: false,
            userEmailInvalid: false
        }
    }

    // check for invalid submissions
    if (IsInList(req.body.userName, userList, "userName")) {
        userObject.userNameTaken = true;
        userObject.user = null;
    }
    if (IsInList(req.body.userEmail, userList, "userEmail")) {
        userObject.userEmailTaken = true;
        userObject.user = null;
    }
    if (isNotValidEmailForm(req.body.userEmail)) {
        userObject.userEmailInvalid = true;
        userObject.user = null;
    }

    // return if fail
    if (userObject.user == null) {
        // res.status(409).send({ msg: 'Username taken' });
        res.send(userObject);
        return;
    }

    // now continue if userName and email are valid
    userObject.user.userName = req.body.userName;
    userObject.user.userEmail = req.body.userEmail;
    userObject.user.passwordHash = await bcrypt.hash(req.body.userPassword, 10);
    userObject.user.token = uuid.v4();

    // add user to list
    userList.push(userObject.user)

    // return cleaned userObject to the user
    setAuthCookie(res, userObject.user.token);
    res.send(cleanUserObjectFull(userObject));

});

apiRouter.post('/auth/login', async (req, res) => {
    // get user
    const user = getUserObject(req.body.userEmail, userList, "userEmail");

    if (!user) {
        res.status(401).send({ msg: 'Incorrect Email or Password' });
        return;
    }

    if (!await bcrypt.compare(req.body.userPassword, user.passwordHash)) {
        res.status(401).send({ msg: 'Incorrect Email or Password' });
        return;
    }

    // set the token
    user.token = uuid.v4();

    // set the cookie
    setAuthCookie(res, user.token);

    // send back to data
    res.send(scrubPassword(user));
});

apiRouter.delete('/auth/logout', async (req, res) => { // expects request to come in as an email 
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

apiRouter.post('/auth/update-data', async (req, res) => {
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    if (user) {
        user = req.body.user;
        res.send(true);
    }
    else {
        res.send(false);
    }
});

apiRouter.get('/comments', async (req, res) => { // get comments
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    if (!user) {
        res.status(401).send("User Not Logged In");
        return
    }
    const returnComments = getUserSideCommentList(commentList, user.userName);
    res.send(returnComments);
});

apiRouter.post('/comments/submit', async (req, res) => {
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    if (!user) {
        res.status(401).send("User Not Logged In");
        return
    }

    // generate comment ID
    let maxCommentID = 0;
    for (const comment of commentList) {
        if (comment.commentID > maxCommentID) {
            maxCommentID = comment.commentID;
        }
    }

    // check for if user has not downloaded the game yet
    let printableDownloadVersion = user.lastVersionDownloaded;
    if (printableDownloadVersion == null) {
        printableDownloadVersion ="n/a";
    }

    let newComment = {
        commentID: maxCommentID + 1,
        user: user.userName,
        commentVersion: user.lastVersionDownloaded,
        commentText: req.body.comment,
        userLikeList: []
    }

    commentList.push(newComment);

    res.send(getUserSideCommentList(commentList, user));

});

apiRouter.post('/comments/like', async (req, res) => {
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    if (!user) {
        res.status(401).send("User Not Logged In");
        return
    }

    for (const comment of commentList) {
        if (comment.commentID === req.body.commentID) {
            let commentIsLiked = comment.userLikeList.includes(user.userName);
            if (req.body.reqValue == true) {
                if (!commentIsLiked) {
                    comment.userLikeList.push(user.userName);
                }
            }
            else {
                if (commentIsLiked) {
                    comment.userLikeList = comment.userLikeList.filter(u => u !== user.userName);
                }
            }
            break;
        }
    }
    
    commentList.sort((a,b) => b.userLikeList.length - a.userLikeList.length);

    let userSideCommentList = getUserSideCommentList(commentList, user.userName);

    res.send(userSideCommentList);

});

async function verifyAuth(req, res, next) {
    const user = await getUserObject(req.cookies[authCookieName], userList, "token")
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized: No User Logged In' });
    }
};


// ------------------------------------------ helper functions ------------------------------------------ //
function getUserSideCommentList (commentList, userName) {
    let userSideCommentList = [];
    for (const comment of commentList) {
        const likes = comment.userLikeList.length;
        const isLikedByUser = comment.userLikeList.includes(userName);
        userSideCommentList.push({
            "commentID": comment.commentID,
            "user": comment.user,
            "commentVersion": comment.commentVersion,
            "commentText": comment.commentText,
            "likes": likes,
            "isLikedByUser": isLikedByUser
        })
    }

    return userSideCommentList;
}

function cleanUserObjectFull (userObject) { // returns user object that can be returned (cleans off private data)
    const {passwordHash, token,  ...cleanedUser} = userObject.user;
    return {
        "error": userObject.error,
        "user": cleanedUser
    };
}

function scrubPassword(user) {
    const {passwordHash, token,  ...cleanedUser} = user;
    return cleanedUser;
}

function IsInList (lookUp, list, listAttr) {
    for (const item of list) {
        if (lookUp == item[listAttr]) {
            return true;
        }
    }
    return false;
}

function isNotValidEmailForm (email) {
    return false; // this isn't checking for anything yet
}

function getUserObject (inputIdenfitier, userObjectList, attrIdenfitier) {
    for (const userObject of userObjectList) {
        if (inputIdenfitier == userObject[attrIdenfitier]) {
            return userObject;
        }
    }
    return null;
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}