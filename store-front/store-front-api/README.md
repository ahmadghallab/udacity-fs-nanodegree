# Storefront Backend

**_Table of Contents_**

-   [Storefront Backend](#storefront-backend-project)
    -   [Getting Started](#getting-started)
        -   [Prerequisites](#prerequisites)
        -   [Installing](#installing)
        -   [Setup environment](#setup-environment)
    -   [Running the application](#running-the-application)
    -   [Running the unit tests](#running-the-unit-tests)
    -   [Built With](#built-with)

A StoreFront backend API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You need the following modules and dependencies installed to run this project:

```bash
docker-compose   # To run the Postgres database on Docker
node 12          # To run the application
yarn             # For dependency management
```

### Installing

Simply, run the following command to install the project dependencies:

```bash
yarn
```

### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
# .env
ENV=dev
PORT=3002
# Set your database connection information here
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_DB_TEST=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
# user
JWT_KEY=12345abcd
```

Next, start the Postgres server on Docker:

```bash
docker-compose up
```

Now, check if Postgres has the database `shopping`, if not create it:

```bash
# Connect to Postgres container
docker exec -it <postgres_container_id> bash

# Login to Postgres
psql -U postgres

# Postgres shell
# This will list out all the databases
\l

# If "shopping" database is not present
create database shopping;

# If "shopping_test" database is not present create one for testing
create database shopping_test;
```

Next, you need to run the database migrations:

```bash
yarn migrations up
```

## Running the application

Use the following command to run the application in watch mode:

```bash
yarn run watch
```

Use the following command to run the application in using node:

```bash
yarn start
```

The application will run on <http://localhost:3002/>.

## Running the unit tests

Use the following command to run the unit tests:

```bash
yarn test
```

You may also use the Postman collection present in the repository for testing.

## Built With

-   [NodeJS](https://nodejs.org/) - The JavaScript runtime
-   [Yarn](https://yarnpkg.com/) - The dependency manager
-   [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
-   [Express](https://expressjs.com) - The web framework
-   [TypeScript](https://www.typescriptlang.org/) - Types JS extension
-   [Jasmine](https://jasmine.github.io/) - The unit testing framework
-   [cookie-session](https://github.com/expressjs/cookie-session) - Simple cookie-based session middleware for authentication.
