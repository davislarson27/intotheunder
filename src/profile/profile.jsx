import React from 'react';

export function Profile({userData, changeUserData}) {

    function getVersion (version) {
        if (version == null) {
            return "Not Yet Downloaded";
        } else {
            return version;
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
                                            <button className="btn btn-outline-danger w-100">Log Out</button>
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
