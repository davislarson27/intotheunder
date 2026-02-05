import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Download } from './download/download';
import { Feedback } from './feedback/feedback';
import { Log_in } from './log_in/log_in';
import { Sign_up } from './sign_up/sign_up';
import { Profile } from './profile/profile';
import { NotFound } from './notfound/notfound';



export default function App() {
  return (
    <BrowserRouter>
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid px-4">
                    <NavLink className="navbar-brand" to="home">Into The Under</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>                  
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex ms-lg-auto">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item"><NavLink to="home" className="nav-link">Home</NavLink></li>
                                <li className="nav-item"><NavLink to="download" href="download.html" className="nav-link">Download</NavLink></li>
                                <li className="nav-item"><NavLink to="feedback" href="feedback.html" className="nav-link">Feedback</NavLink></li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                                    
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><NavLink className="dropdown-item" to="log_in">Log In</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="sign_up">Sign Up</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="profile">Profile</NavLink></li>
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
        <Route path='/download' element={<Download />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/login' element={<Log_in />} />
        <Route path='/sign_up' element={<Sign_up />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

        
        <footer className="bg-light text-dark">
            <div className="container py-4">
                <div className="row align-items-center g-4">
                    <div className="col-12 col-md-auto">
                        <span className="footer_text text-muted">&copy; 2026 Into The Under</span>
                    </div>
                    <div className="col-12 col-md-auto">
                        <a className="text-muted" target="_blank" href="https://github.com/davislarson27/intotheunder/">Page Git Hub</a>
                    </div>
                </div>    
            </div>
        </footer>
        
    </BrowserRouter>
  );
}