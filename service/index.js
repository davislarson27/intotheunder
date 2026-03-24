const express = require('express');
const app = express();

app.use(express.static('public'));

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

const authCookieName = "token";

app.use(express.json());
app.use(cookieParser());

let apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
  
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

// create new user
apiRouter.post('/auth/create', async (req, res) => {

    // create userReturnObject to be returned
    let user = {
        userName: null,
        userEmail: null,
        lastOSDownloaded: "macsilicon", // macsilicon is the default until they try something else
        lastVersionDownloaded: "n/a",
        userCommentsIDs: []
    };

    // check for invalid submissions
    if (IsInList(req.body.userName, userList, "userName")) {
        res.status(409).send({ msg: 'Username is already taken' });
        return;
    }
    if (IsInList(req.body.userEmail, userList, "userEmail")) {
        res.status(409).send({ msg: 'Email is already taken' });
        return;
    }
    if (isNotValidEmailForm(req.body.userEmail)) {
        res.status(400).send({ msg: 'Not a valid email' });
        return;
    }
    if (isInvalidPassword(req.body.userPassword)) {
        res.status(400).send({ mes: 'Invalid password - please try a more secure password' });
        return;
    }

    // return if fail
    if (user == null) {
        res.status(409).send({ msg: 'An error occured while creating your account - please try again' });
        return;
    }

    // now continue if userName and email are valid
    user.userName = req.body.userName;
    user.userEmail = req.body.userEmail;
    user.passwordHash = await bcrypt.hash(req.body.userPassword, 10);
    user.token = uuid.v4();

    // add user to list
    userList.push(user)

    // return cleaned userObject to the user
    setAuthCookie(res, user.token);
    res.send(scrubPassword(user));

});


// keeps user logged in on refresh
apiRouter.get('/auth/me', async (req, res) => {
    const token = req.cookies[authCookieName];
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    if (user) {
        res.send({
            user: scrubPassword(user),
            isLoggedIn: true
        });
    }
    else {
        res.send({
            user: null,
            isLoggedIn: false
        });
    }
});

// login
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

// logout
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await getUserObject(req.cookies[authCookieName], userList, "token");
    if (user) {
      delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  });

// update data (mainly for most recent version downloaded)
apiRouter.post('/auth/update-data', async (req, res) => {
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    if (user) {
        Object.assign(user, req.body.user);
        res.send(true);
    }
    else {
        res.send(false);
    }
});

// gets comments
apiRouter.get('/comments', verifyAuth, async (req, res) => { // get comments
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    // if (!user) {
    //     res.status(401).send("User Not Logged In");
    //     return
    // }
    const returnComments = getUserSideCommentList(commentList, user.userName);
    res.send(returnComments);
});

// submits a new comment
apiRouter.post('/comments/submit', verifyAuth, async (req, res) => {
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    // if (!user) {
    //     res.status(401).send("User Not Logged In");
    //     return
    // }

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

// attempts to like a comment
apiRouter.post('/comments/like', verifyAuth, async (req, res) => {
    let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    // if (!user) {
    //     res.status(401).send("User Not Logged In");
    //     return
    // }

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


// ------------------------------------------ helper functions ------------------------------------------ //

async function verifyAuth(req, res, next) {
    const user = await getUserObject(req.cookies[authCookieName], userList, "token")
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized: No User Logged In' });
      return;
    }
};

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
    if (!inputIdenfitier) {
        return null;
    }
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

function isInvalidPassword(password) {
    return false;
}