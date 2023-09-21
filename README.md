# YTSD
Self destructing youtube videos

## What is YTSD
YTSD stand for YouTube Self Destruct, it's a basic Node.js script that counts down a timer, updating the video's title as it does so.
When the timer hits zero, the video is "destroyed" (made private).
Views and likes increase the remaining time.

## How does it work
YTSD uses Firebase Functions to run every 10 minutes (approx the shortest interval without using up the daily free quota).
Persistant data is stored in the target video's tags to avoid additional quota use and be easier to set up.

## Deploying and Running
YTSD takes 4 environment variables `VIDEO_ID` - The ID of the target YouTube video, as well as `CLIENT_ID`, `ClIENT_SECRET` and `REFRESH_TOKEN`, which are obtained from the Google Cloud console [video demonstration by GeekLaunch](https://www.youtube.com/watch?v=jtDJg2euQhk).
> Note: if you experience an "access denied" error when selecting your YouTube channel from the OAuth2 screen, you must add the email of the account that owns the channel to the "test users" list under "Oauth Consent Screen" tab in the developer console EVEN IF IT'S THE SAME USER AS THE OWNER OF THE PROJECT!

To deploy with Firebase use `firebase functions:secrets:set SECRET_NAME` to create the environment variables (replace `SECRET_NAME` with  `CLIENT_ID`, `ClIENT_SECRET`, `REFRESH_TOKEN` or `VIDEO_ID` - one for each command).
To deploy to firebase run `firebase deploy --only functions`
 
