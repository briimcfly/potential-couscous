# Social Network API
An API for a social network web application built using Express.js, MongoDB, and the Mongoose ODM. 

## User Story 
`AS` A social media startup <br>
`I WANT` an API for my social network that uses a NoSQL database <br>
`SO THAT` my website can handle large amounts of unstructured data <br>

## Acceptance Criteria
`GIVEN` a social network API <br>
`WHEN` I enter the command to invoke the application <br>
`THEN` my server is started and the Mongoose models are synced to the MongoDB database <br>
`WHEN` I open API GET routes in Insomnia for users and thoughts <br>
`THEN` the data for each of these routes is displayed in a formatted JSON <br>
`WHEN` I test API POST, PUT, and DELETE routes in Insomnia <br>
`THEN` I am able to successfully create, update, and delete users and thoughts in my database <br>
`WHEN` I test API POST and DELETE routes in Insomnia <br>
`THEN` I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Overview
The goal of this project was to create the back end for a social media product. The back end allows for CREATE, READ, UPDATE, and DELETE on Thoughts, Users, and Reactions.

[Link to Video Demo](https://www.youtube.com/watch?v=LWdSJ6Nk7zY&ab_channel=BryanBickel)

![My App](https://github.com/briimcfly/potential-couscous/assets/7972240/c856a440-2d13-47fe-9bf0-df5d6c4fc442)


## Installation
To get started, clone the repository from the provided link. Then, enter the project directory and use your preferred package manager to install the necessary dependencies.

## Usage
After completing the installation, start the application and run source db/schema.sql to build the database, then source db/seeds.sql to seed the tables.

## Technologies Used
* npm
* Mongo
* Mongoose

## Reflection
This project has allowed me to apply the core skills I have recently learned and put them into practice. During development, I had the opportunity to deepen my understanding of the Mongo and Mongoose. Additionally, I developed a deeper appreciation for for the importance code commenting, and the development principal DRY. (Don't repeat yourself).
