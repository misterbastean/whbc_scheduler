- Created Worker route. Need to test further to make sure it works, then need to get rid of edge cases/formatting (e.g. phone number format, etc.).
- Just finished updating seedDb so that it creates 2 workers for the jbastean user. Need to work on the user profile page to display them.

Important Later:
- Implement Mongoose remove middleware to remove workers/participants associated with a user when the user is removed: https://stackoverflow.com/a/14349259


Small Stuff:
- Update new user password verify so that it verifies on front end prior to form submission
- Password reset via email
- Add dropdown for relationship of emergency contacts to prevent problems caused by strange characters
- Validate inputs (e.g. worker zip code is 5 digits, all phone numbers are 10, etc.)


Future Ideas
- Allow users to upload a profile picture
- Allow users to reset password via security question
