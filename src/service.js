// log in and account creation functions
export function createNewAccount (userName, userEmail, userPassword) {

    // load userList
    let userList = JSON.parse(localStorage.getItem('userList') || '[]');

    // create userReturnObject to be returned
    let userObject = {
        user: {
            userName: null,
            passwordToken: null,
            userEmail: null,
            lastVersionDownloaded: null,
            lastOSDownloaded: "macsilicon", // macsilicon is the default until they try something else
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
    userObject.user.passwordToken = userPassword;

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

    if (userObject != null && password == userObject.passwordToken) {
        return cleanUserObject(userObject);
    }
    else {
        return null;
    }
}