// log in and account creation functions
export function createNewAccount (userName, userEmail, userPassword) {

    // load userList
    let userList = JSON.parse(localStorage.getItem('userList') || '[]');

    // create userReturnObject to be returned
    let userReturnObject = {
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
        userReturnObject.userNameTaken = true;
        userReturnObject.user = null;
    }
    if (IsInList(userEmail, userList, "userEmail")) {
        userReturnObject.userEmailTaken = true;
        userReturnObject.user = null;
    }
    if (isNotValidEmailForm(userEmail)) {
        userReturnObject.userEmailInvalid = true;
        userReturnObject.user = null;
    }

    // return if fail
    if (userReturnObject.user == null) {
        return userReturnObject;
    }

    // now continue if userName and email are valid
    userReturnObject.user.userName = userName;
    userReturnObject.user.userEmail = userEmail;
    userReturnObject.user.passwordToken = userPassword;

    // now write that to the database (localstorage)
    userList.push(userReturnObject.user);
    localStorage.setItem('userList', JSON.stringify(userList)); // we don't want to save the error handling

    // return userReturnObject to the user
    return userReturnObject;
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