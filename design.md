# Summary
A simple web app that allows users to create events and have end users register to attend those events as workers or participants. Event owners can assign workers and participants to roles or groups and get various reports.

## Routes Notes
Start off at landing page with banner at top to login as user, but shows index of events for workers/participants to register. Registration page (separate for workers and participants) is just a form that adds to the DB. Make sure to add an option at end of form to register another person with the same info (e.g. multiple kids).

### Routes
#### App
| Name                  | Method  | Endpoint
|-----------------------|---------|----------
|Landing                | GET     | /
|Show Login Form        | GET     | /login
|Log User In            | POST    | /login
|Log User Out           | POST    | /logout

#### Events

| Name                  | Method  | Endpoint
|-----------------------|---------|----------
|Event Index            | GET     | /events
|New Event Form         | GET     | /events/new
|Create Event           | POST    | /events
|Show Event             | GET     | /events/:id
|Edit Event             | GET     | /events/:id/edit
|Update Event           | PUT     | /events/:id
|Delete Event           | DELETE  | /events/:id
|Show Add Worker        | GET     | /events/:id/workers/new
|Add Worker             | POST    | /events/:id/workers
|Show Edit Workers      | GET     | /events/:id/workers/edit
|Update Workers         | PUT     | /events/:id/workers
|Show Add Participant   | GET     | /events/:id/participants/new
|Add Participant        | POST    | /events/:id/participants
|Show Edit Participants | GET     | /events/:id/participants/edit
|Update Participants    | PUT     | /events/:id/participants


#### Users
| Name                 | Method  | Endpoint
|----------------------|---------|----------
|User Index            | GET     | /users
|New User Form         | GET     | /users/new
|Create User           | POST    | /users
|Show User             | GET     | /users/:id
|Edit User             | GET     | /users/:id/edit
|Update User           | PUT     | /users/:id
|Delete User           | DELETE  | /users/:id


#### Workers
| Name                 | Method  | Endpoint
|----------------------|---------|----------
|Worker Index (remove?)| GET     | /users/:id/workers
|New Worker Form       | GET     | /users/:id/workers/new
|Create Worker         | POST    | /users/:id/workers
|Show/Edit Worker      | GET     | /users/:id/workers/:wid
|Update Worker         | PUT     | /users/:id/workers/:wid
|Delete Worker         | DELETE  | /users/:id/workers/:wid

#### Participants
| Name                 | Method  | Endpoint
|----------------------|---------|----------
|Participant Index     | GET     | /users/:id/participants
|New Participant Form  | GET     | /users/:id/participants/new
|Create Participant    | POST    | /users/:id/participants
|Show/Edit Participant | GET     | /users/:id/participants/:pid
|Update Participant    | PUT     | /users/:id/participants/:pid
|Delete Participant    | DELETE  | /users/:id/participants/:pid

## Data Structure


### Event
Object representing an event. image_url should include "http[s]://"
```javascript
{  
  name: String,  
  description: String,  
  imageUrl: String,  
  registrationCutoff: Date,  
  startDate: Date,
  endDate: Date,  
  workerRoles: [String],  
  participantGroups: [String],
  workers: [Worker],
  participants: [Participant],
  owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }
}
```

### User
Object representing a user of the web app. Normal Users are used for authentication and authorization, and can CRUD multiple Workers and/or Participants that they create. The purpose is to allow one person (e.g. a parent) to create and manage multiple Workers and/or Participants.

Admin Users are able to create events, as well as read, edit, and delete events they created. They have full CRUD for all workers and participants. They can also read and edit their own profile.

Superusers are able to CRUD all admins, users, events, workers, and participants.

Consider implementing Google SSO.

```javascript
{  
  username: String,
  password: String, //Hashed by passport-local-mongoose
  email: String,
  phone: String,
  isAdmin: Boolean,
  isSuperuser: Boolean,
  workers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker"
    }
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant"
    }
  ],
  salt: String, // Not in model, created by Passport before storing
  hash: String  // Not in model, created by Passport before storing
}
```

### Worker
Object representing a worker, such as a volunteer, teacher, group leader, etc. Currently, these are specific to a single User, but can be added to multiple events.

```javascript
{  
  firstName: String,  
  lastName: String,  
  gender: String,  
  dob: Date,  
  address: String,  
  city: String,  
  state: String,  
  zip: String,  
  phone: String, // 5555555555
  email: String,  
  emergencyContacts: [
    {
      name: String,  
      phone: String, // 5555555555  
      relationship: String  
    }
  ],  
  shirtSize: String,  
  comments: String,
  user: String  
}
```

### Participant
Object representing a participant (i.e. a person attending the event). Currently, these are specific to a single User, but can be added to multiple events.

```javascript
{
  firstName: String,  
  lastName: String,  
  gender: String,  
  dob: Date,  
  medical: String,
  allergies: [String],
  address: String,  
  city: String,  
  state: String,  
  zip: String,  
  phone: String, // 5555555555  
  email: String,   
  emergencyContacts: [
    {
      name: String,  
      phone: String, // 5555555555  
      relationship: String  
    }
  ],  
  authorizedPickups: [
    {
      name: String,  
      phone: String // 5555555555
    }
  ],
  shirtSize: String,  
  churchMember: Boolean,  
  church: String,  
  photoPermission: Boolean,  
  photoPublication: Boolean,  
  comments: String,
  user: String
}
```
