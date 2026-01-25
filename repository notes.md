Things to remember

Command to get in: 
ssh -i~/desktop/cs260/whykeepdigging.pem ubuntu@54.243.197.140


public ip: 44.222.189.36

elastic ip: 54.243.197.140


when using vi to edit caddy click the esc button then the :eq to exit and save


for deploying to the server
- caddy is responsible for rerouting to which application (simon vs startup)
- the -s flag is which service parameter is being used
- command is ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon
