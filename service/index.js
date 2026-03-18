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
commentsList = [];


// ------------------------------------------ routes list ------------------------------------------ //
"/auth/create"
"/auth/login"
"/auth/logout"
"/comments"
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
    res.send(cleanUserObject(userObject));

});

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

function cleanUserObject (userObject) { // returns user object that can be returned (cleans off private data)
    const {passwordHash, token,  ...cleanedUser} = userObject.user;
    return {
        "error": userObject.error,
        "user": cleanedUser
    };
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
  