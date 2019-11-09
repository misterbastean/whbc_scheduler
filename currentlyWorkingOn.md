- Just finished logic for Participant Edit form and route (to fill the data in automatically), but this needs lots of testing and handling of edge cases.
- Need to add logic to delete participants and workers.

Important Later:
- Implement Mongoose "remove" middleware to remove workers/participants associated with a user when the user is removed: https://stackoverflow.com/a/14349259
- Implement "Edit Profile" button on user profile page
- Add authorization for each route as needed
- Front-end stuff (make it purty!)
  - Landing page
  - Add flash for user feedback
- Fix Registration Cutoff in editEvent to be a datepicker
- Archive events after their end date - should still be visible to the creator, but not display elsewhere.


Small Stuff:
- Update new user password verify so that it verifies on front end prior to form submission
- Password reset via email
- Add dropdown for relationship of emergency contacts to prevent problems caused by strange characters
- Validate inputs (e.g. zip codes are 5 digits, phone numbers are 10, etc.)


Future Ideas
- Allow users to upload a profile picture
- Allow users to reset password via security question
