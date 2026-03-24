import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import './app.css';

import { NavLink, Route, Routes, useNavigate, Navigate, useLocation} from 'react-router-dom';
import { Home } from './home/home';
import { Download } from './download/download';
import { Feedback } from './feedback/feedback';
import { Login } from './login/login';
import { Sign_up } from './sign-up/sign-up';
import { Profile } from './profile/profile';
import { ChooseLogin } from './choose-login/choose-login';
import { NotFound } from './notfound/notfound';

import { logOutService, checkLogin } from './serviceInteraction';

function ForceLogin ( {userData, children} ) {
    const location = useLocation();
    if (!userData) {
        return (
            <Navigate 
                to="/choose-login"
                state ={{from: location.pathname}}
                replace
            />
        );
    }
    return children;
}

export default function App() {

    const [userData, changeUserData] = React.useState (null);

    const navagate = useNavigate();
    const location = useLocation();

    React.useEffect( () => {
        const from = location.state?.from || "/home";

        checkLogin().then(
            user => changeUserData(user)
        ).then(
            from => navagate(from)
        );
    }, []);

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
                alert("user was logged out!");
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
        <div className="d-flex flex-column min-vh-100">
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid px-4">
                        <NavLink className="navbar-brand" to="/">Into The Under</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>                  
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="d-flex ms-lg-auto">
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                    <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                                    <li className="nav-item"><NavLink to="download" className="nav-link">Download</NavLink></li>
                                    <li className="nav-item"><NavLink to="feedback" className="nav-link">Feedback</NavLink></li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                                        
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            { isUserLoggedIn(userData) ? (
                                                <>
                                                    <li><NavLink className="dropdown-item" to="profile">Profile</NavLink></li>
                                                    <li><button className="logout-btn dropdown-item text-danger" onClick={logOut}>Log Out</button></li>
                                                </>
                                            ) : (
                                                <>
                                                    <li><NavLink className="dropdown-item" to="login">Log In</NavLink></li>
                                                    <li><NavLink className="dropdown-item" to="sign-up">Sign Up</NavLink></li>
                                                </>
                                            )}
                                        </ul>
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

        <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/home' element={<Home />} />
            <Route
                path='/download'
                element={
                    <ForceLogin userData={userData}>
                        <Download  userData={userData} changeUserData={changeUserData}/>
                    </ForceLogin>
                }
            />
            <Route 
                path='/feedback'
                element={
                    <ForceLogin userData={userData}>
                        <Feedback 
                            userData={userData}
                            changeUserData={changeUserData}
                        />
                    </ForceLogin>
                } 
            />
            <Route path='/login' element={<Login userData={userData} changeUserData={changeUserData} />} />
            <Route path='/sign-up' element={<Sign_up userData={userData} changeUserData={changeUserData} />} />
            <Route path='/choose-login' element={<ChooseLogin userData={userData} changeUserData={changeUserData} />} />
            <Route path='/profile' element={<Profile userData={userData} changeUserData={changeUserData} />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

            
            <footer className="bg-light text-dark">
                <div className="container py-4">
                    <div className="row align-items-center g-4">
                        <div className="col-12 col-md-auto">
                            <span className="footer_text text-muted">&copy; 2026 Davis Larson</span>
                        </div>
                        <div className="col-12 col-md-auto">
                            <a className="text-muted" target="_blank" href="https://github.com/davislarson27/intotheunder/">Page Git Hub</a>
                        </div>
                    </div>    
                </div>
            </footer>
        </div>
    );
}