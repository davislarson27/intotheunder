# *Into the Under Game* Hub

## What it is (Pitch)
*Into the Under* is a 2D Python game I am developing that I want to create a hub website to download it and provide a space for community engagement!

## Key Features of the *Into the Under* Game Hub

## Landing Page
Basic HTML Page with some pictures of gameplay mixed in

<img width="1936" height="1416" alt="landing page drawing" src="https://github.com/user-attachments/assets/48de5980-a6c1-487c-9ce8-80dd810e91f3" />

### Game Download Page
The Game Download page will allow the user to select a version of *Into the Under* and download it to their computer. This page provides release notes and a live count of how many downloads the game has.

<img width="1936" height="1458" alt="downloads page" src="https://github.com/user-attachments/assets/9b958735-eaf2-43c9-a7e7-0563de242919" />


### Community Suggestions Page
Provides a page for community suggestions. Allows users to vote up suggestions and help features get the attention of developers.

<img width="1936" height="1458" alt="community suggestions page" src="https://github.com/user-attachments/assets/0fa8fd9a-7ae9-44e4-98ee-5569538db7a6" />


### Seed Sharing
Similar to the Community Voting Page, but this page will allow users to share world generation seeds that they found fun to play! Users can also upvote seeds they found entertaining!

### User Engagement Scores
Tracks user engagement and promotes users with likes over users without likes

### Log-In Page
Allows account creation and log in

<img width="1936" height="1458" alt="Log In Page Drawing" src="https://github.com/user-attachments/assets/ae4350e6-801e-4567-bf77-be4f295d8e76" />


## Technology Specifications

### HTML
Has pages built for downloading, login, acount creation, community suggestions, and seed sharing

### CSS
Make pages look good and encourage downloads by providing a good first impression for the game using correct CSS formats

### React
Displays likes on up-votes for new game features
Displays live download numbers
Displays live seed suggestions and new game features ideas as comments that get added to the list as they are included
Provides Login UI

### Service
Stores user's current most recent downloaded version on download
Stores suggestions and seed suggestion comments
Stores likes on comments
Retreiving download versions
Retrieving user's most recent version downloaded
Retrieves likes and comments
Log-in and Log-out users
Create new accounts

### Database
Stores user's suggestions and community involvement scores (based on count of likes they have gotten and count of suggestions or seed sharing made)
(may keep game's data as well and store time spent on the game)

### WebSocket
Feeds live comments and suggestions
