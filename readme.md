# Ordum's API + DB

gm!

This is Ordum LTD's Web 2 backend. Since not all tasks are suitable for Web3 ye.

## To Run

Clone this repo and run:

> yarn

You will also need to run an instance of MongoDB on your system/server:

https://www.mongodb.com/docs/manual/installation/

Usefull tools:

https://www.postman.com/ - to test your server requests
https://robomongo.org/ - to keep a track on your MongoDB databases.

## Simple API rundown:

This API and documentation are in early phases of development. We are not trying to break things, but things do break.
Please tell us of any issues you have with our tools - we do appreceate and expect your feedback and suggestions!


### Ordum has two destinct user groups:

- Individual - A person within the organization/team who has certains resonsibilities. This can be anyone from a studnet to a CEO.

- Organization - Basically an "oragnizations" or a "team" account, to manage proposals, team members and various changes.

Each of them has a different represntation in our UI. We would love to connect as many people, to as many teams as possible,
to increas productivity and communication between people and companies in the Web3 world. 

### Ordum;s DB keeps track on the fallowing:

- Proposals
- Milestones
- Tasks - Part of each milestones, they help us keeping track of how far a milestone has progressed. You set a number of hours and
a cost per hours, as well as assig multiple team members to each task. 

## API requests:

### Oganizations

GET url/organizations/:id - Get's an organizaiton public profile by ID.
GET url/organizations/:id/proposals - Read all the proposals an organization has published
GET (auth) url/organizations/:id  - Returns your organizations profile. 

POST url/organizations/ - Creates an organization (returns JWT)
POST url/organizations/login - Logs in (returns JWT) an organizion (returns Organization's JSON + token)
POST (auth) url/organizations/logout - Logs out the organization form the current device (deletes the token)
POST (auth) url/organizations/logoutAll - Logs out form ALL devices.

POST (auth) url/organizations/addteammember - Add a teammember to a waiting list. If the teammember makes a
requst to this organization's :id, and they are in this list, they will be added to it. (supposed to work
with an email invite)


### Individuals

GET url/individuals/:id

POST url/individuals/ - Create an individual (returns JWT)
POST (auth) url/individuals/login - Logs in a user.
POST (auth) url/individuals/logout - Logs out a user

POST (auth) url/individuals/signup/:id - Makes a request to on organization (by id). If the individual's
id is in their waiting list, the individaul will now be a teammember of this organization

### Proposals

GET url/organizations/:id/proposals - Read all the proposals an organization has published
GET (auth) url/proposals/drafts - Read all drafts

POST (auth) url/proposals - Creates a proposal for the loged in user.
POST (auth) url/proposals/drafts - Creates a proposal draft for the loged in user.
PATCH (auth) url/proposals/:id - Update/change a proposal.

### Tasks

POST (auth) url/tasks - Creates a task# mvp-api
