## ABOUT THE PROJECT

This is a small project that delivers a rest API with Typescript, and is hosted in AWS lambda function

### BACKEND

An API in TypeScript supports a basic name searching function.
- Run `npm install` to install all the dependencies
- Run `npm start serve` to start the backend API
- Once the server starts, access the URL `localhost:8888` in Postman or browser
- Endpoints:
    - `localhost:8888/names` [GET] to list all the names
    - `localhost:8888/search` [POST] to search the most matched name by passing the JSON request (e.g. `{"input": "David Smith"}`)
