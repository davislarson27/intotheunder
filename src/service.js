// log in and account creation functions
export function createNewAccount (userName, userEmail, userPassword) {

    // load userList
    let userList = JSON.parse(localStorage.getItem('userList') || '[]');

    // create userReturnObject to be returned
    let userObject = {
        user: {
            userName: null,
            // passwordToken: null,
            userEmail: null,
            lastOSDownloaded: "macsilicon", // macsilicon is the default until they try something else
            lastVersionDownloaded: null,
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
    if (IsInList(userName, userList, "userName")) {
        userObject.userNameTaken = true;
        userObject.user = null;
    }
    if (IsInList(userEmail, userList, "userEmail")) {
        userObject.userEmailTaken = true;
        userObject.user = null;
    }
    if (isNotValidEmailForm(userEmail)) {
        userObject.userEmailInvalid = true;
        userObject.user = null;
    }

    // return if fail
    if (userObject.user == null) {
        return userObject;
    }

    // now continue if userName and email are valid
    userObject.user.userName = userName;
    userObject.user.userEmail = userEmail;
    // userObject.user.passwordToken = userPassword; // this will have to do something but for now chrome is freaking out about it

    // now write that to the database (localstorage)
    userList.push(userObject.user);
    localStorage.setItem('userList', JSON.stringify(userList)); // we don't want to save the error handling

    // return cleaned userObject to the user
    return cleanUserObject(userObject);
}

function cleanUserObject (userObject) { // returns user object that can be returned (cleans off private data)
    const {passwordToken, ...cleanedUser} = userObject;
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

function isNotValidEmailForm (email) { // we'll want to check this on the back end as well as front end in case of dom manipulation
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

export function logInUser (userEmail, password) {
    // load userList
    const userList = JSON.parse(localStorage.getItem('userList') || '[]');

    // get user
    const userObject = getUserObject(userEmail, userList, "userEmail")
    return userObject;

    // if (userObject != null && password == userObject.passwordToken) {
    //     return cleanUserObject(userObject);
    // }
    // else {
    //     return null;
    // }
}

export function updateUserData (userObject) {
    let userList = JSON.parse(localStorage.getItem('userList') || '[]');

    let i = 0;
    let foundUser = false;
    for (let user of userList) {
        if (user.userName == userObject.userName) {
            foundUser = true;
            break;
        }
        i++;
    }

    if (foundUser) {
        userList[i] = userObject;
        console.log(userObject.lastVersionDownloaded);
    }
    
    localStorage.setItem('userList', JSON.stringify(userList));
}

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

export function getComments (userData) {
    if (!userData) return []; // if nobody is logged in don't try this :)

    let commentList = JSON.parse(localStorage.getItem('commentList') || '[]');

    let userSideCommentList = getUserSideCommentList(commentList, userData.userName);

    localStorage.setItem('commentList', JSON.stringify(commentList));

    return userSideCommentList;
}

export function sendComment (comment, userData) {
    if (!userData) return []; // if nobody is logged in don't try this :)

    let commentList = JSON.parse(localStorage.getItem('commentList') || '[]');

    // generate comment ID
    let maxCommentID = 0;
    for (const comment of commentList) {
        if (comment.commentID > maxCommentID) {
            maxCommentID = comment.commentID;
        }
    }

    let newComment = {
        commentID: maxCommentID + 1,
        user: userData.userName,
        commentVersion: userData.lastVersionDownloaded,
        commentText: comment,
        userLikeList: []
    }

    commentList.push(newComment);

    localStorage.setItem('commentList', JSON.stringify(commentList));

    const userSideCommentList = getUserSideCommentList(commentList, userData.userName);

    return userSideCommentList;
}

export function likeCommentRequest (commentID, reqValue, userName) {
    let commentList = JSON.parse(localStorage.getItem('commentList') || '[]');

    for (const comment of commentList) {
        if (comment.commentID === commentID) {
            let commentIsLiked = comment.userLikeList.includes(userName);
            if (reqValue == true) {
                if (!commentIsLiked) {
                    comment.userLikeList.push(userName);
                }
            }
            else {
                if (commentIsLiked) {
                    comment.userLikeList = comment.userLikeList.filter(u => u !== userName);
                }
            }
            break;
        }
    }

    localStorage.setItem('commentList', JSON.stringify(commentList));
    
    let userSideCommentList = getUserSideCommentList(commentList, userName);

    return userSideCommentList;
}