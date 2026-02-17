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

export function getComments (userData) {
    if (!userData) return []; // if nobody is logged in don't try this :)

    let commentList = JSON.parse(localStorage.getItem('commentList') || '[]');

    let dummyList = [
        {
            commentID: 1,
            user: "BestUserNameEver",
            commentVersion: "v1.4.0",
            commentText: "The game is cool but crafting unique blocks would make it even better",
            userLikeList: [
                "PixelMiner42",
                "SnowBiomeScout",
                "RedstoneRanger",
                "BlockBuilderX",
                "FrostByte",
                "DesertDrifter",
                "IronPickPro",
                "EmeraldEdge",
                "CraftyCoder",
                "GlacierGamer",
                "LavaWalker",
                "BedrockBoss",
                "CoalCollector",
                "NetherNomad",
                "SkyBlockSam",
                "DiamondDavis",
                "ChunkExplorer",
                "CaveCrawler",
                "BuildModeBen",
                "ArcticArchitect"
            ]
        },
        {
            commentID: 2,
            user: "JimTheThird",
            commentVersion: "v1.4.0",
            commentText: "We should let us remove stuff from our inventory or throw it out",
            userLikeList: [
                "PixelMiner42",
                "SnowBiomeScout",
                "RedstoneRanger",
                "BlockBuilderX",
                "FrostByte",
                "DesertDrifter",
                "IronPickPro",
                "EmeraldEdge",
                "CraftyCoder",
                "GlacierGamer",
            ]
        },
        {
            commentID: 3,
            user: "CrazyDave67",
            commentVersion: "v1.3.2",
            commentText: "I wish that we had chests in the game",
            userLikeList: [
                "ChunkExplorer",
                "CaveCrawler",
                "BuildModeBen",
                "ArcticArchitect"
            ]
        },
        {
            commentID: 4,
            user: "McDonaldsLover",
            commentVersion: "v1.4.0",
            commentText: "Increase the build height limit!",
            userLikeList: [
                "PixelMiner42",
                "fakeUserName"
            ]
        },
        {
            commentID: 5,
            user: "JoseTheGOAT",
            commentVersion: "v1.4.0",
            commentText: "A background would be so cool! Maybe like in Terraria.",
            userLikeList: [
                "fakeUserName"
            ]
        },
        {
            commentID: 6,
            user: "McDonaldsLover",
            commentVersion: "v1.3.1",
            commentText: "Ok imagine this. Right now the insides of buildings look off because they don't have backgrounds. Imagine if they had a way to add blocks as a wall that made it look more like you were inside! I would be so down for that. Then we wouldn't have to dig out the ground to build tall stuff!",
            userLikeList: []
        },
        {
            commentID: 7,
            user: "Johnny123",
            commentVersion: "v1.3.0",
            commentText: "Doors please?",
            userLikeList: []
        },
        {
            commentID: 8,
            user: "rambo2.0",
            commentVersion: "v1.3.1",
            commentText: "Please make swimming mechanics more consistent!",
            userLikeList: []
        },
        {
            commentID: 9,
            user: "WhatAUser111",
            commentVersion: "v1.3.1",
            commentText: "Ladders would be so nice",
            userLikeList: []
        },
        {
            commentID: 10,
            user: "MegaBatman",
            commentVersion: "v1.4.0",
            commentText: "Please add the ability to take damage!",
            userLikeList: []
        },
        {
            commentID: 11,
            user: "SomeoneCool",
            commentVersion: "v1.4.0",
            commentText: "Here's some bad advice",
            userLikeList: []
        },
        {
            commentID: 12,
            user: "User123",
            commentVersion: "v1.4.0",
            commentText: "I like cheese",
            userLikeList: []
        },
        {
            commentID: 13,
            user: "TheFakeJimmer",
            commentVersion: "v1.4.0",
            commentText: "you should add the whole energy bar thing",
            userLikeList: []
        },
        {
            commentID: 14,
            user: "MabelMagnet",
            commentVersion: "v1.4.0",
            commentText: "Multiplayer would be cool",
            userLikeList: []
        },
        {
            commentID: 15,
            user: "JasonBourne123",
            commentVersion: "v1.4.0",
            commentText: "what about adding a hunger bar?",
            userLikeList: []
        },
        {
            commentID: 16,
            user: "NotAPolitician",
            commentVersion: "v1.4.0",
            commentText: "Can we choose between different skins",
            userLikeList: []
        },
        {
            commentID: 17,
            user: "TheJoker",
            commentVersion: "v1.4.0",
            commentText: "We should have creative mode like in Minecraft",
            userLikeList: []
        },
        {
            commentID: 18,
            user: "CougarsBoulevard",
            commentVersion: "v1.4.0",
            commentText: "We should be able to play on Linux",
            userLikeList: []
        },

    ];

    for (const comment of dummyList) { // temp to give dummy data
        if (!commentList.some(c => c.commentID === comment.commentID)) {
            commentList.push(comment);
        }
    }

    let userSideCommentList = [];
    for (const comment of commentList) {
        const likes = comment.userLikeList.length;
        const isLikedByUser = comment.userLikeList.includes(userData.userName);
        userSideCommentList.push({
            "commentID": comment.commentID,
            "user": comment.user,
            "commentVersion": comment.commentVersion,
            "commentText": comment.commentText,
            "likes": likes,
            "isLikedByUser": isLikedByUser
        })
    }

    localStorage.setItem('commentList', JSON.stringify(commentList));

    return userSideCommentList;

}

export function sendComment (comment, userData) {

}

export function likeCommentRequest (commentID, reqValue, userName) {
    let commentList = JSON.parse(localStorage.getItem('commentList') || '[]');

    for (const comment of commentList) {
        if (comment.commentID === commentID) {
            if (reqValue == true) {
                if (!comment.userLikeList.includes(userName)) {
                    comment.userLikeList.push(userName);
                }
            }
            else {
                comment.userLikeList = comment.userLikeList.filter(u => u !== userName);
            }
            break;
        }
    }

    localStorage.setItem('commentList', JSON.stringify(commentList));
    
}