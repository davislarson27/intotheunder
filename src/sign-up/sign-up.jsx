import React from 'react';

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { createNewAccount } from '../serviceInteraction';

export function Sign_up({userData, changeUserData}) {
    const [userNameInput, setUserNameInput] = React.useState ("");
    const [userEmailInput, setUserEmailInput] = React.useState ("");
    const [userPasswordInput, setUserPasswordInput] = React.useState ("");

    const location = useLocation();
    const navagate = useNavigate();

    const from = location.state?.from || "/profile";


    async function submitNewAccount (event) {
        event.preventDefault();
        const userSubmission = event.target.value;

        const returnUserObject = await createNewAccount(userNameInput, userEmailInput, userPasswordInput);
        
        // this is testing code
        if (returnUserObject.user != null) {
            changeUserData(returnUserObject.user);
            alert(returnUserObject.user.userName);
            navagate(from)
        }
        else {
            alert("ran into an error creating your account")
        }
    }
    
  return (
    <main className="py-4 flex-grow-1">

        <div className="container">
            <div className="row g-4">
                <div className="col-10 col-md-6 mx-auto">

                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h4 className="h-4">Create an account</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitNewAccount}>
                              
                                <div className="mb-4 text-muted">already have an account - log in <NavLink to="/login">here</NavLink>!</div>

                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Username</label>
                                    <input id="userName" type="text" name="userName" className="form-control" placeholder="username123" onChange={(e) => setUserNameInput(e.target.value)} required></input>
                                </div>

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
                                    <button type="submit" className="btn btn-primary w-100">Create Account </button>
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
