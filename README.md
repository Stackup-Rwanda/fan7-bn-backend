
# Barefoot Nomad

[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![Build Status](https://travis-ci.org/Stackup-Rwanda/fan7-bn-backend.svg?branch=develop)](https://travis-ci.org/Stackup-Rwanda/fan7-bn-backend)

# General Overview
A web application intend to make travel and accommodation easy and convenient.

#### Database migration

- To connect to database, modify config.js file in /src/config and include your DB parameters or add DATABASE_URL env.
- Run the command 'node_modules/.bin/sequelize db:migrate' to migrate the dummy user table.

# Github 

## Git Repository

https://github.com/Stackup-Rwanda/fan7-bn-backend

## Server side hosted on Heroku

https://barefoot-nomad-staging.herokuapp.com/

## Getting Started

### Prerequisites to use of API

1. Postman
2. Any web browser

### Prerequisites to get this API running on your local system

1. Node js/express/postgres DB
2. Any text editor(Preferrably VS Code)
3. Git

### Installation
1. Clone this repository into your local machine:

```
 git clone https://github.com/Stackup-Rwanda/fan7-bn-backend
```
2. Install dependencies 
```
- npm install.
```
3. Start the application by running the start script

```
- npm start.
``` 

4. Install postman to test all endpoints on port 5000.

### Test

run test using 'npm test'.

## Features


### Coding Style

- Airbnb style guide.

### Linting Library
- Eslint 

### Testing Framework
- Mocha     - JavaScript Test Framework for API Tests
- Chai      - TDD Assertion Library for Node
- Chai HTTP - Addon plugin for the Chai Assertion Library

### Compiler
Babel - Compiler for ES6 Javascript
 
## Built With

- NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.


## Author

- Fantastic 7 Group

## License
ISC

## Acknowledgement

- Andela

