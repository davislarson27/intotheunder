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
    let response;
    let body;
    
    try {
        response = await fetch('/api/auth/create', {
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

        body = await response.json();

    } catch (error) {
        console.log(error.msg);
        throw new Error("something went wrong - please try again!");
    }


    if (response?.status === 200) {
        return body;
    }
    else if (response?.status === 409 || response?.status == 400) {
        throw new Error(body.msg);
    }
    else {
        throw new Error("something went wrong - please try again!");
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

export async function updateLastDownloadDetails (os_type, version) {
    const response = await fetch('/api/auth/update-download-details', {
        method:'post',
        body: JSON.stringify({
            'os_type': os_type,
            'version': version
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

export async function sendComment (comment, userData, webSocket) {
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
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify({ update: true }));
        }
        return body;
    }
    else {
        throw new Error(body.msg);
    }
}

export async function likeCommentRequest (commentID, reqValue, userName, webSocket) {
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
        if (webSocket && webSocket.readyState === WebSocket.OPEN) {
            webSocket.send(JSON.stringify({ update: true }));
        }
        return body;
    }
    else {
        throw new Error(body.msg);
    }
}

export async function checkLogin () {
    const response = await fetch('/api/auth/me', {
        method:'get',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (response?.status === 200) {
        const body = await response.json();
        if (body?.isLoggedIn) {
            return body.user;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
}