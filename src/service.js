// log in and account creation functions
export function submitNewAccount (userName, userEmail, userPassword) {

    // load userList
    const userList = JSON.parse(localStorage('userList') || '[]');

    // create userObject to be returned
    let userObject = {
        user: {
            userName: null,
            passwordToken: null,
            userEmail: null,
            lastVersionDownloaded: null,
            lastOSDownloaded: "macsilicon", // macsilicon is the default until they try something else
            userCommentsIDt: []
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
    localStorage.setItem(JSON.stringify(userObject.user)); // we don't want to save the error handling

    // return userObject to the user
    return userObject;
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