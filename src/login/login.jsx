import React from 'react';

export function Login() {
  return (
    <main class="py-4 flex-grow-1">
            
        <div class="container">
            <div class="row g-4">
                <div class="col-10 col-md-6 mx-auto">

                    <div class="card shadow-sm">
                        <div class="card-header">
                            <h4 class="h-4">Log in</h4>
                        </div>
                        <div class="card-body">
                            <form action="profile.html" method="post">
                                <div class="mb-4 text-muted">create a new account <a href="sign_up.html">here</a>!</div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input id="email" type="email" name="email" class="form-control" placeholder="name@example.com" required></input>
                                </div>

                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input id="password" type="password" name="password" class="form-control" placeholder="enter password here" required></input>
                                </div>

                                <br class="my-3"/>

                                <div class="mb-3">
                                    <button type="submit" class="btn btn-primary w-100">Log in</button>
                                </div>

                                <div class="mb-3">
                                    <button id="google_login" class="btn btn-outline-secondary w-100">Log in With Google</button>
                                </div>

                            </form>        
                        </div>
                    </div>

        
                </div>
            </div>
        </div>

    </main>
);
}
