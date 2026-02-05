## Things to remember

Command to get in: 
ssh -i~/desktop/cs260/whykeepdigging.pem ubuntu@54.243.197.140


public ip: 44.222.189.36

elastic ip: 54.243.197.140

## Caddy
when using vi to edit caddy click the esc button then then :wq to exit and save
    vi Caddyfile
    esc, :wq to write and escape
to restart:
    sudo service caddy restart

editing caddy - original routing before i moved my website's primary domain to face the same way as startup.intotheunder.com
use 

intotheunder.com {
   root * /usr/share/caddy
   file_server
   header Cache-Control no-store
   header -etag
   header -server
}


startup.intotheunder.com {
   reverse_proxy * localhost:4000
   header Cache-Control no-store
   header -server
   header -etag
   header Access-Control-Allow-Origin *
}

simon.intotheunder.com {
   reverse_proxy * localhost:3000
   header Cache-Control no-store
   header -server
   header -etag
   header Access-Control-Allow-Origin *
}


## Using the .sh file to deploy to the server
for deploying to the server
- caddy is responsible for rerouting to which application (simon vs startup)
- the -s flag is which service parameter is being used
- command is ./deployReact.sh -k <yourpemkey> -h <yourdomain> -s simon/startup
- use "sudo chmod +x deployFiles.sh" to give the .sh file permission to run


## Setting Up React

### in directory
npm init -y
npm install vite@latest -D

### go to package.json and replace script section with
"scripts": {
   "dev": "vite",
   "build": "vite build",
   "preview": "vite preview"
}

### move files (example from simon)
mkdir public && mv placeholder.jpg favicon.ico public/
mkdir -p src/about src/login src/play src/scores
mv main.css src/app.css

### install bootstrap and react
npm install bootstrap react-bootstrap
npm install react react-dom react-router-dom

import 'bootstrap/dist/css/bootstrap.min.css';

### create index.jsx in root
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

### create app.jsx in src
create app.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './app.css';

export default function App() {
  return <div className="body bg-dark text-light">App will display here</div>;
}

### change names in CSS
change body references to .body

### create an index.html page in the root as entry point
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <title>Simon React</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script> <!-- this is wher the code is getting injected -->
  </body>
</html>


## running the live page for a react page 
npm run dev
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Home } from './home/home';

inside the thing
export default function App() {
   return (
      <BrowserRouter>
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
      </BrowserRouter>
   );


### Helpful Shortcuts
command + shift + l -> changes name throughout page