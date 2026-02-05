import React from 'react';

export function Sign_up() {
  return (
    <main class="py-4 flex-grow-1">

        <div class="container">
            <div class="row g-4">
                <div class="col-10 col-md-6 mx-auto">

                    <div class="card shadow-sm">
                        <div class="card-header">
                            <h4 class="h-4">Create an account</h4>
                        </div>
                        <div class="card-body">
                            <form action="profile.html" method="post">
                              
                                <div class="mb-4 text-muted">already have an account - log in <a href="log_in.html">here</a>!</div>

                                <div class="mb-3">
                                    <label for="userName" class="form-label">Username</label>
                                    <input id="userName" type="text" name="userName" class="form-control" placeholder="username123" required></input>
                                </div>

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
                                    <button type="submit" class="btn btn-primary w-100">Create Account </button>
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
