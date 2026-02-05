import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';
import { Download } from './download/download';
import { Feedback } from './feedback/feedback';
import { Log_in } from './log_in/log_in';
import { Sign_up } from './sign_up/sign_up';
import { Profile } from './profile/profile';


export default function App() {
  return (
    <browswer_router>
      <div className="body bg-dark text-light">App will display here</div>
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
    </browswer_router>
  );
}