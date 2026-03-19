export async function updateUserData (userObject) {
    const response = await fetch('/api/auth/update-data', {
        method:'post',
        body: JSON.stringify({
            'user':userObject,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response?.status === 200) {
        return response.json();
    }
    else {
        return false;
    }
}

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

export async function likeCommentRequest (commentID, reqValue, userName) {
    if (!userName) return []; // if nobody is logged in don't try this :)

    const response = await fetch('/api/comments/like', {
        method:'post',
        body: JSON.stringify({
            "commentID": commentID,
            "reqValue": reqValue,
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
