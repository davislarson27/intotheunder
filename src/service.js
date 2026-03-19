// ------------------------------- account management functions ------------------------------- //

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

// ------------------------------- comments functions ------------------------------- //

function updateCommentsLocalStorage (commentList) { // updates comments AFTER reorganizing them -> mutates original object
    
    commentList.sort((a,b) => b.userLikeList.length - a.userLikeList.length)
    localStorage.setItem('commentList', JSON.stringify(commentList));

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

    //localStorage.setItem('commentList', JSON.stringify(commentList));
    updateCommentsLocalStorage(commentList);
    
    let userSideCommentList = getUserSideCommentList(commentList, userName);

    return userSideCommentList;
}



// keep functions

export async function logInUser (userEmail, password) {
    const response = await fetch('/api/auth/login', {
        method:'post',
        body: JSON.stringify({
            'userEmail':userEmail,
            'userPassword':password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (response?.status === 200) {
        const body = await response.json();
        return body;
    }
    else {
        const body = await response.json();
        throw new Error(body.msg);
    }
}

export async function createNewAccount (userName, userEmail, userPassword) {
    const response = await fetch('/api/auth/create', {
        method:'post',
        body: JSON.stringify({
            'userName': userName,
            'userEmail':userEmail,
            'userPassword': userPassword
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const body = await response.json();

    if (response?.status === 200) {
        return body;
    }
    else {
        throw new Error(body.msg);
    }
}

export async function logOutService() {
    const response = await fetch(`/api/auth/logout`, {
        method: 'delete',
    });

    if (response?.status === 200) { // success
        return false;
    }
    else { // failure
        return true;
    }
}

export async function getComments (userData) {
    if (!userData) return []; // if nobody is logged in don't try this :)

    let response = await fetch('/api/comments', {
        method:'get',
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    });

    if (response?.status === 200) {
        return await response.json();
    }

    return [];
}

export async function sendComment (comment, userData) {
    if (!userData) return []; // if nobody is logged in don't try this :)

    const response = await fetch('/api/comments/submit', {
        method:'post',
        body: JSON.stringify({
            "comment": comment
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const body = await response.json();

    if (response?.status === 200) {
        return body;
    }
    else {
        throw new Error(body.msg);
    }
}
