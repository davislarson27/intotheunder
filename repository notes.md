Things to remember

Command to get in: 
ssh -i~/desktop/cs260/whykeepdigging.pem ubuntu@54.243.197.140


public ip: 44.222.189.36

elastic ip: 54.243.197.140


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


for deploying to the server
- caddy is responsible for rerouting to which application (simon vs startup)
- the -s flag is which service parameter is being used
- command is ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon
- use "sudo chmod +x deployFiles.sh" to give the .sh file permission to run
