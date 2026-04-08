const express = require('express');
const app = express();

app.use(express.static('public'));

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const db = require('./database.js');

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

// userList = [];
// commentList = [];


// ------------------------------------------ routes list ------------------------------------------ //
"/auth/create"
"/auth/login"
"/auth/logout"
"/auth/update-data"
"/comments"
"/comments/submit"
"/comments/like"


// --------------------------------------- main functions begin here -------------------------------------- //

const httpService = app.listen(port, () => {
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
    if (await db.getUserByUserName(req.body.userName)) {
        res.status(409).send({ msg: 'Username is already taken' });
        return;
    }
    if (await db.getUserByEmail(req.body.userEmail)) {
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
    db.createUser(user);

    // return cleaned userObject to the user
    setAuthCookie(res, user.token);
    res.send(scrubPassword(user));

});


// keeps user logged in on refresh
apiRouter.get('/auth/me', async (req, res) => {
    const token = req.cookies[authCookieName];
    let user = await db.getUserByToken(token);
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
    const user = await db.getUserByEmail(req.body.userEmail);

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
    await db.setUserToken(user.userEmail, user.token);

    // set the cookie
    setAuthCookie(res, user.token);

    // send back to data
    res.send(scrubPassword(user));
});

// logout
apiRouter.delete('/auth/logout', async (req, res) => {
    const token = req.cookies[authCookieName];
    let user = await db.getUserByToken(token);
    if (user) {
      delete user.token;
    }
    await db.removeUserToken(user.email);
    res.clearCookie(authCookieName);
    res.status(204).end();
  });

// update data (mainly for most recent version downloaded)
apiRouter.post('/auth/update-download-details', async (req, res) => {
    // let user = await getUserObject(req.cookies[authCookieName], userList, "token");
    let user = await db.getUserByToken(req.cookies[authCookieName]);
    if (user) {
        // Object.assign(user, req.body.os_type);
        await db.replaceDownloadDetails(user.userEmail, req.body.os_type, req.body.version);
        res.send(true);
    }
    else {
        res.send(false);
    }
});

// gets comments
apiRouter.get('/comments', verifyAuth, async (req, res) => { // get comments
    const returnComments = getUserSideCommentList(await db.getComments(), req.user.userName);
    res.send(returnComments);
});

// submits a new comment
apiRouter.post('/comments/submit', verifyAuth, async (req, res) => {
    // generate comment ID
    commentList = await db.getComments();

    let maxCommentID = 0;
    for (const comment of commentList) {
        if (comment.commentID > maxCommentID) {
            maxCommentID = comment.commentID;
        }
    }

    // check for if user has not downloaded the game yet
    let printableDownloadVersion = req.user.lastVersionDownloaded;
    if (printableDownloadVersion == null) {
        printableDownloadVersion ="n/a";
    }

    let newComment = {
        commentID: maxCommentID + 1,
        user: req.user.userName,
        commentVersion: req.user.lastVersionDownloaded,
        commentText: req.body.comment,
        userLikeList: []
    }

    await db.submitNewComment(newComment);

    res.send(getUserSideCommentList(commentList, req.user));

});

// attempts to like a comment
apiRouter.post('/comments/like', verifyAuth, async (req, res) => {
    let user = req.user;
    let comment = await db.getComment(req.body.commentID);
    if (!comment) {
        // res.status(401).send({ msg: 'Unauthorized: No User Logged In' });
        return;
    }

    if (comment.userLikeList.includes(user.userName)) { // this means we are unliking it
        comment.userLikeList = comment.userLikeList.filter(u => u !== user.userName);
    }
    else { // this means we are liking it
        comment.userLikeList.push(user.userName);
    }
    await db.modifyUserLikedList(comment);
    
    let userSideCommentList = getUserSideCommentList(await db.getComments(), user.userName);

    res.send(userSideCommentList);

});


// ------------------------------------------ helper functions ------------------------------------------ //

async function verifyAuth(req, res, next) {
    const token = req.cookies[authCookieName];
    let user = await db.getUserByToken(token);

    if (user) {
        req.user = user;
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized: No User Logged In' });
      return;
    }
};

function getUserSideCommentList (commentList, userName) {
    // sort comments
    commentList = commentList.sort((a,b) => b.userLikeList.length - a.userLikeList.length);

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

function scrubPassword(user) {
    const {passwordHash, token,  ...cleanedUser} = user;
    return cleanedUser;
}

function isNotValidEmailForm (email) {
    return false; // this isn't checking for anything yet
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