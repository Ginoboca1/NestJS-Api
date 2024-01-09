# Nest-Api

This API is a final project for the "Javascript in Backend" Bootcamp at Codigo Facilito.

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

## Project structure

-Auth: Handles authentication for entities using the API.
-Users: Manages user-related functionality.
-Admins: Manages admin-related functionality.
-Posts: Enables entities to create posts and handles post-related operations.
