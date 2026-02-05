import React from 'react';

export function Profile() {
  return (
    <main class="py-4 flex-grow-1">

        <div class="container">
            <div class="row g-4">
                <div class="col-10 col-md-6 mx-auto">

                    <div class="card shadow-sm">
                        <div class="card-header">
                            <h4 class="h-4">Profile Details</h4>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">User: <span class="userName_displayed">username123</span></div>
                            <div class="mb-3">Email: <span class="userEmail_displayed">useremail@gmail.com</span></div>
                            <div class="mb-3">Latest Version Installed: <span class="latestVersion_displayed">v1.4.0</span></div>

                            <br class="my-3"/>

                            <div class="mb-3">
                                <button class="btn btn-outline-danger w-100">Log Out</button>
                            </div>

                        </div>
                    </div>
        
                </div>
            </div>
        </div>

    </main>
);
}
