import React from 'react';

import { NavLink, useNavigate, useLocation } from "react-router-dom";


export function ChooseLogin({userData, changeUserData}) {
    const [pagePurpose, changePagePurpose] = React.useState(" to Download")
    const location = useLocation();

    const from = location.state?.from || "/";

    
    const navagate = useNavigate();

    function chooseLogin () {
        console.log(from);
        navagate('/login', { state: {from} });
    }

    function chooseSignUp () {
        navagate('/sign-up', { state: {from} });
    }

    return (
        <main className="py-4 flex-grow-1">
                
            <div className="container">
                <div className="row g-4">
                    <div className="col-10 col-md-7 mx-auto">

                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h4 className="h-4">Log In or Sign Up!</h4>
                            </div>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-12 col-md-6 p-3">
                                        <button className="btn btn-primary w-100 mt-4" onClick={chooseLogin}>Log In</button>
                                        <button className="btn btn-outline-secondary w-100 mt-4 mb-4" onClick={chooseSignUp}>Sign Up</button>
                                    </div>
                                    <div className="col-12 col-md-6 bg-light p-3">
                                    <p>Sign in to be able to get access to additional features!</p>
                                        <ul>
                                            <li>Download Into the Under</li>
                                            <li>Give Community Feedback</li>
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </main>
    );
}
