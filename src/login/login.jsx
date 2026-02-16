import React from 'react';

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logInUser } from '../service';


export function Login({userData, changeUserData}) {
    const [userEmailInput, setUserEmailInput] = React.useState ("");
    const [userPasswordInput, setUserPasswordInput] = React.useState ("");

    const location = useLocation();
    const navagate = useNavigate();

    const from = location.state?.from || "/profile"

    function submitLogIn (event) {
        event.preventDefault();
        const userEvent = event.target.value;

        const userObject = logInUser(userEmailInput, userPasswordInput);

        if (userObject == null) {
            alert("username or password is incorrect");
        } else {
            changeUserData(userObject);
            alert(`${userObject.userName} was logged in successfully`);
            navagate(from);
        }
    }

    function submitLogInGoogle () {
        alert("error: google log in is not currently available");
    }

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
                                <form onSubmit={submitLogIn}>
                                    <div className="mb-4 text-muted">create a new account <NavLink to="/sign-up">here</NavLink>!</div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input id="email" type="email" name="email" className="form-control" placeholder="name@example.com" onChange={(e) => setUserEmailInput(e.target.value)} required></input>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input id="password" type="password" name="password" className="form-control" placeholder="enter password here" onChange={(e) => setUserPasswordInput(e.target.value)} required></input>
                                    </div>

                                    <br className="my-3"/>

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary w-100">Log in</button>
                                    </div>

                                    <div className="mb-3">
                                        <button type="button" id="google_login" className="btn btn-outline-secondary w-100" onClick={submitLogInGoogle}>Log in With Google</button>
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
