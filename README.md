# fyp-v2
 
## TODO
Misc 
- Maybe add color palettes for individual emotions?
- ~~Make login/register form slightly bigger to fix zooming issue on mobile~~ fixed by disabling zoom on mobile
- Maybe rewrite session checking on the backend

Register
- Validation and proper error handling

Mood Logging
- ~~Mood Logging Main Page~~
- ~~Add New Entry Page~~
- ~~View Entry Page~~
- ~~Backend and Logic~~
- Changed the logic so that users can only log one entry per day
- Check whether an existing entry already exists for the day
- If true, ask them whether they want to overwrite it
- Maybe make the document id the date of entry instead of random UID

Mental Assessment
- ~~Each radio button onclick will set value corresponding to the question index (ques no. - 1 bcoz array starts from 0)~~
- TODO: **Function to check for unanswered questions (check which index is still null and focus on that question)**
- TODO: **Auto scroll after answering a section (maybe)**
- ~~Calculate and summary screen (see ChatGPT)~~

Landing Page
- Basic info (about us and features)
- Direct link for external resources
- Login and sign up

## Issues
- ~~Sometimes it fails to get user and uid (dk what the conditions are)~~ Fixed in sessionprovider (9/7/2024)
- (mobile only) Pressing an option in the sidebar does not close it