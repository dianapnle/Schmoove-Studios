import { SiSequelize } from "react-icons/si";
# Urban Steps

Click the following link: [Urban Steps](https://urbansteps.onrender.com/)

Urban Steps is a website and online directory that helps people discover and get involved in local dance studios in their area. I have always been interested in combining my passion for dance and technical skills so I built this project to combine the two! A lot of dance studios in my area currently do not have their own websites, so this project's purpose was to resolve basic interactions a dance studio and student would want. Urban Steps' users can view dance studios, instructors, classes, and write reviews. Studio owners can add instructors to their studios and be able to have class schedules on here too! This website is perfect for studio owners who do not have their own website as they can display class schedules for their respective dance studios. This website is also perfect for studio owners who already have a website as it can be another avenue of discovery for people who are interested in taking classes. The backend of Urban Steps is built on SQL, sequelize, and express with a PostgreSQL database. Frontend rendering is handled with React and Redux. AWS is also implemented to support image upload and storage.

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,sqlite,nodejs,sequelize,postgres,react,redux,express,aws" />
  </a>
</p>

## How to clone

To clone this repo as `<new-project-name>`, run

```shell
git clone git@github.com:dianapnle/UrbanSteps.git <new-project-name>
```

in the directory where you want the new project to appear.

## How to install and run

Once the repo is cloned, to setup backend:

`cd <new-project-name>`, then `cd backend && npm install` \
`npx dotenv sequelize db:migrate`\
`npx dotenv sequelize-cli db:seed:all`

to setup frontend:
`cd <new-project-name>` then `cd frontend && npm install`

to install
dependencies.

To run the app, type `npm start` in the backend directory and `npm run dev` in the frontend directory.

## Features & Implementation

#### React router and components

Urban Steps is a single page app. The React router handles the logic associated with component navigation and updates accordingly to the root route. The child components are done through React & Redux.

#### Frontend and Backend Interaction

Urban Steps server is currently limited to posting data and modification of the database. The frontend stores retrieves and stores necessary information for rendering the site upon entry. There are seed data in the database which can be retrieved and modified, and new information can be passed to be stored into the database as well. The current application is limited to CRUD of studios, instructors, reviews, and classes.

#### Authentication

Users of the site are required to sign up if they would like to post a review or manage studio listings. Users can see studio details but will not see additional functionalities that include creating a studio. Upon account creation, the user passwords are hashed with B-crypt before being stored. Authentication uses B-crypt to match passwords which allow a user to login if the passwords match.

#### CRUD

##### Studios

Studios are the core of Urban Steps. All functionalities center around them. The studio table has columns for `ownerId, name, logo, pic, and description`. With the exception of the ownerId, all the other inputs are from the user. The owner_id is a foreign key that points to the associated owner. Upon creating a studio, name, logo, picture, and description are required. The logo and picture input will ask for a file upload from the user creating the studio, which is connected with AWS S3.

<img src="frontend/images/addstudio.png" />


Urban Steps lets studio owners create, read, update, and destroy studios. React components and functionalities have been implemented for each corresponding action in the app. Information needed for all components or users actions are managed with redux states.

Users can update the details of the studio that they own as well as delete it under a `Manage Studios` link. The link has a list of studios that the user has made along with update or delete functionalities. Once an update or delete has been made:

Update:
1. An update studio form will appear with values pre-populated into the input boxes. Users can change details accordingly.
2. When user clicks update, a call is made to the backend to update the details in the database. Then, the store receives the studio's updated details, and then re-renders to display the studio's details and all associated details.

Delete:
1. A user can delete a studio with a click of a button. Upon clicking "Delete", a modal will pop up. This delete button will prompt the user to reconfirm if the user wants to delete the studio or not.
2. If no, the modal will close and the studio will remain. If yes, there will be a call made to the backend to delete the studio. Once the store receives the changes in the user's studios, the manage studios browser will re-render and remove the studio that was just deleted and close the modal.

##### Instructors

Urban Steps also lets studio owners to add instructors to the studios that they own. Heading over to "Manage Studios" link, under a studio that they own, there will be three links. One to edit the studio, one to delete the studio, and one that is labeled "Edit Instructors/Classes". Clicking "Edit Instructors/Classes" will re-direct the user to a different page that allows the user to manage classes and instructors for that studio. This re-direction to a different page is intentional to avoid clutter on the manage studios page. The available instructors to add are users who indicate that they are an instructor upon signing up. These instructors are the same list of available instructors that show up for each studio registered on the platform, allowing for instructors to teach at multiple studios. The instructors will be added under the studio in the studio detail page. Once an instructor is registered as an instructor for that studio, his or her name will be removed from the list of available instructors.

Example Add Instructor
<img src="frontend/images/createinstructors.png" />

Upon clicking "Add Instructor", a modal will pop up asking for a file to upload for the instructor. Adding a profile picture is optional, and can be updated later. If no image is specified, a default "no image available" will take place for the instructor's profile picture displayed on the studio detail page, which can be updated later. The storage of images is done with AWS S3 and allows for secure and reliable image stroage.

<img src="frontend/images/uploadinstructor.png" />

Once an instructor has been made, the new instructor is quickly added under the studio's list of instructors displayed beneath and removed from the list of available instructors to add. It is done by the following:

1. After the instructor is selected to be added, a call is made to the backend which checks if the instructor is already an instructor for this studio and if the user's input is validated.
2. If successful, after the store receives the studio's updated details and list of instructors, it will re-renders to display the added instructor.

#### New Features Queue

Some features missing from this current app that will hopefully be implemented at a future date:

- CRUD class events/schedule
- CRUD class bookings
