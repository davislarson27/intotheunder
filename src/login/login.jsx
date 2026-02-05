import React from 'react';

import { NavLink } from "react-router-dom";


export function Login() {
  return (
    <main className="py-4 flex-grow-1">
            
        <div className="container">
            <div className="row g-4">
                <div className="col-10 col-md-6 mx-auto">

                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h4 className="h-4">Log in</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-4 text-muted">create a new account <NavLink to="/sign_up">here</NavLink>!</div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input id="email" type="email" name="email" className="form-control" placeholder="name@example.com" required></input>
                                </div>

                                <div className="mb-3">
                                    <label for="password" className="form-label">Password</label>
                                    <input id="password" type="password" name="password" className="form-control" placeholder="enter password here" required></input>
                                </div>

                                <br className="my-3"/>

                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary w-100">Log in</button>
                                </div>

                                <div className="mb-3">
                                    <button id="google_login" className="btn btn-outline-secondary w-100">Log in With Google</button>
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
