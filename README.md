# Nest-Api

This API is the final project of the "Javascript in Backend" Bootcamp at Codigo Facilito.

## Content table

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contribute](#contribute)
- [License](#license)

## Requirements

Node.js and npm are required to use the API.

## Instalation

1. Clone the repository: `git clone https://github.com/Ginoboca1/NestJS-Api.git`
2. Navigate to the project directory: `cd your-api`
3. Install dependencies: `npm install`

## Configuration

1. Create a `.env` file based on the `.env.example` template.
2. Adjust environment variables as needed, including the database connection string (available in the API Documentation).
3. Obtain a bearer token through Login for endpoint access.

## Usage

1. Start the application: `npm start`
2. Access the API at http://localhost:3000 by default.
3. Utilize the included Postman collection in the project's root for testing.
4. Refer to the API documentation for detailed endpoints and operations.
5. You can access to API documentation page in this path http://localhost:3000/api/docs#/
6. Remember what all path's are protected, if you wanna access them you will need a bearer token provided
   in Login. Dont worry! I will provide an administrator token so you can try this API.
7. In the API documentation page, in authorization section you will need pass the token and magic! Now you can
   test my API :D

admin token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGU5Zjg3OThhOWU4M2I5NDBhZjhmNSIsIm5hbWUiOiJHaW5vIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA0ODkwNjYzLCJleHAiOjE3MTAwNzQ2NjN9.h3i5XtLq350kYK9rdMv7T-nuOliVMgHubuOgxYPgdHo

user token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWU5MGVlZjgwMjYwOTJlZDNjMjRkYiIsIm5hbWUiOiJDb2R5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDQ4OTEwMjksImV4cCI6MTcxMDA3NTAyOX0.aOQ28V23MpWbzgQ-0yrJTzps9JDr8BiPjL2dbP3DUbg


## Project modules

-Auth: Handles authentication for entities using the API.
-Users: Manages user-related functionality.
-Admins: Manages admin-related functionality.
-Posts: Enables entities to create posts and handles post-related operations.

If you wanna learn more about the project structure and endpoints, please read the documentation!
https://fallacious-whitefish-1fb.notion.site/Nest-API-Codigo-Facilito-0c3eb12c7e0f4207a548b2b9fc8ed102?pvs=4
