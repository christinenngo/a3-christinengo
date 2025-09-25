Assignment 3 - Persistence: Two-tier Web Application with Database, Express server, and CSS template
===

Readme
---

## Watchlistify

Railway: https://a3-christinengo-production.up.railway.app/

A watchlist site that allows users to keep track of all the shows and movies they've watched or are currently watching. 
It logs the format, title, genre, rating, episodes watched, total episodes, and progress. 
Each user can access their own data by logging into their GitHub account.
Challenges I faced while making the application were with the sessions and the callback routing for authentication.
I chose to implement OAuth authentication using passport.js because I wanted to use GitHub authentication so that users can simply use their GitHub account to access the application.
I used the Sakura CSS framework because it was minimalistic and looked good with the contents of my page.
I added custom CSS for the grid layout and alignment of the content because I wanted the form and the table to be side-by-side.
I also added CSS for the login page so that the text was larger and centered.

List of Express middleware packages:
- express.json: Used to parse JSON requests into req.body.
- express.static: Used to use files from the public directory.
- express-session: Used for storing session cookies.
- passport.initialize: Used for 
- passport.session: Used to read and write users to the session.
- passport.authenticate: Used to route GitHub authentication for login.

## Technical Achievements
- **Tech Achievement 1**: I implemented OAuth authentication with the GitHub strategy using passport.js and express sessions. 
- **Tech Achievement 2**: I hosted my site on a different service using Railway. I found my site was deployed faster than when using Render and the UI was simple to navigate. It also redeployed instantly as soon as I pushed any new commits.
- **Tech Achievement 3**: I achieved 100% for all four lighthouse tests for both my login and home page. (Performance may be affected by Chrome extensions, so I ran lighthouse in incognito mode.)