import React from 'react';

import { NavLink, useNavigate } from "react-router-dom";

import { logOutService } from '../service';

// Uncaught ReferenceError: navagate is not defined
// at logOut (profile.jsx:25:13)

export function Profile({userData, changeUserData}) {

    // pull in functions for navigation
    const navagate = useNavigate();

    function getVersion (version) {
        if (version == "n/a" || version == null) {
            return "No Version Downloaded Yet";
        } else {
            return version;
        }
    }

    function isUserLoggedIn(userObject) {
        if (userObject == null) {
            return false;
        } else {
            return true;
        }
    }
    
    async function logOut () {
        if (isUserLoggedIn(userData)) {
            const loggedOut = await logOutService();
            if (loggedOut) {
                changeUserData(null);
                alert("user was logged out");
                navagate('/');
            }
            else {
                alert("error: logout failed")
            }
        } else {
            alert("error: nobody is logged in");
        }
    }
    
    return (
        <main className="py-4 flex-grow-1">

            <div className="container">
                <div className="row g-4">
                    <div className="col-10 col-md-6 mx-auto">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h4 className="h-4">Profile Details</h4>
                            </div>

                            {userData == null ? (
                                <>
                                    <div className="card-body">
                                        <div className="mb-3">No User Is Logged In</div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="card-body">

                                        <div className="mb-3">User: {userData.userName}</div>
                                        <div className="mb-3">Email: {userData.userEmail}</div>
                                        <div className="mb-3">Latest Version Installed: {getVersion(userData.lastVersionDownloaded)}</div>

                                        <br className="my-3"/>

                                        <div className="mb-3">
                                            <button className="btn btn-outline-danger w-100" onClick={logOut}>Log Out</button>
                                        </div>

                                    </div>
                                </>
                            )}
                        </div>
            
                    </div>
                </div>
            </div>

        </main>
    );
}
