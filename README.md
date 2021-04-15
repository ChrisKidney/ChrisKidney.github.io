<img width="150px" src="https://w0244079.github.io/nscc/nscc-jpeg.jpg" >

# PROG 2700 - Final Assignment

Include all of your code in this repository.

# Test profiles
Can enter a profile custom URL ID, Steam ID number, or full profile URL to access a profiles stats.

## Custom URL
ravex_
## Profile ID
76561198039843239
## Full URL
https://steamcommunity.com/id/ravex_/
-or-
https://steamcommunity.com/profiles/76561198039843239

## More accounts to test with
https://steamcommunity.com/profiles/76561198004854956 <br>
https://steamcommunity.com/profiles/76561197991348083 <br>
https://steamcommunity.com/id/ChristopherGeTRiGhTAlesund <br>
https://steamcommunity.com/id/tacocs/ 

## Example of private profile (Cannot access stats so it errors out and displays message)
https://steamcommunity.com/id/gabelogannewell 

# NOTE 
API that I am using is not CORS enabled so I had to use a [cors-anywhere](https://github.com/Rob--W/cors-anywhere) cors proxy server that I cloned and hosted on Heroku to make my API calls. Due to Heroku sleeping the application when it's not in use, the first API call can take a few seconds to respond after initially opening the web app.

