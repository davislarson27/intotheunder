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

export function getComments () {
    return [
        {
            commentID: 1,
            user: "BestUserNameEver",
            commentVersion: "v1.4.0",
            commentText: "The game is cool but crafting unique blocks would make it even better",
            likes: 87
        },
        {
            commentID: 2,
            user: "JimTheThird",
            commentVersion: "v1.4.0",
            commentText: "We should let us remove stuff from our inventory or throw it out",
            likes: 62
        },
        {
            commentID: 3,
            user: "CrazyDave67",
            commentVersion: "v1.3.2",
            commentText: "I wish that we had chests in the game",
            likes: 26
        },
        {
            commentID: 4,
            user: "McDonaldsLover",
            commentVersion: "v1.4.0",
            commentText: "Increase the build height limit!",
            likes: 17
        },
        {
            commentID: 5,
            user: "JoseTheGOAT",
            commentVersion: "v1.4.0",
            commentText: "A background would be so cool! Maybe like in Terraria.",
            likes: 17
        },
        {
            commentID: 6,
            user: "McDonaldsLover",
            commentVersion: "v1.3.1",
            commentText: "Ok imagine this. Right now the insides of buildings look off because they don't have backgrounds. Imagine if they had a way to add blocks as a wall that made it look more like you were inside! I would be so down for that. Then we wouldn't have to dig out the ground to build tall stuff!",
            likes: 14
        },
        {
            commentID: 7,
            user: "Johnny123",
            commentVersion: "v1.3.0",
            commentText: "Doors please?",
            likes: 11
        },
        {
            commentID: 8,
            user: "rambo2.0",
            commentVersion: "v1.3.1",
            commentText: "Please make swimming mechanics more consistent!",
            likes: 9
        },
        {
            commentID: 9,
            user: "WhatAUser111",
            commentVersion: "v1.3.1",
            commentText: "Ladders would be so nice",
            likes: 5
        },
        {
            commentID: 10,
            user: "MegaBatman",
            commentVersion: "v1.4.0",
            commentText: "Please add the ability to take damage!",
            likes: 3
        },
        {
            commentID: 11,
            user: "SomeoneCool",
            commentVersion: "v1.4.0",
            commentText: "Here's some bad advice",
            likes: 2
        },
        {
            commentID: 12,
            user: "User123",
            commentVersion: "v1.4.0",
            commentText: "I like cheese",
            likes: 2
        },
        {
            commentID: 13,
            user: "TheFakeJimmer",
            commentVersion: "v1.4.0",
            commentText: "you should add the whole energy bar thing",
            likes: 1
        },
        {
            commentID: 14,
            user: "MabelMagnet",
            commentVersion: "v1.4.0",
            commentText: "Multiplayer would be cool",
            likes: 1
        },
        {
            commentID: 15,
            user: "JasonBourne123",
            commentVersion: "v1.4.0",
            commentText: "what about adding a hunger bar?",
            likes: 0
        },
        {
            commentID: 16,
            user: "NotAPolitician",
            commentVersion: "v1.4.0",
            commentText: "Can we choose between different skins",
            likes: 0
        },
        {
            commentID: 17,
            user: "TheJoker",
            commentVersion: "v1.4.0",
            commentText: "We should have creative mode like in Minecraft",
            likes: 0
        },
        {
            commentID: 18,
            user: "CougarsBoulevard",
            commentVersion: "v1.4.0",
            commentText: "We should be able to play on Linux",
            likes: 0
        },

    ];

}