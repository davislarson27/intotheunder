import React from 'react';

export function Profile({userData, changeUserData}) {
  return (
    <main className="py-4 flex-grow-1">

        <div className="container">
            <div className="row g-4">
                <div className="col-10 col-md-6 mx-auto">

                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h4 className="h-4">Profile Details</h4>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">User: <span className="userName_displayed">username123</span></div>
                            <div className="mb-3">Email: <span className="userEmail_displayed">useremail@gmail.com</span></div>
                            <div className="mb-3">Latest Version Installed: <span className="latestVersion_displayed">v1.4.0</span></div>

                            <br className="my-3"/>

                            <div className="mb-3">
                                <button className="btn btn-outline-danger w-100">Log Out</button>
                            </div>

                        </div>
                    </div>
        
                </div>
            </div>
        </div>

    </main>
);
}
