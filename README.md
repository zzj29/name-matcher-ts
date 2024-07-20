## ABOUT THE PROJECT

This is a small project that delivers a rest API with Typescript, and is hosted in AWS lambda function

### BACKEND

An API in TypeScript supports a basic name searching function.
- Run `npm install` to install all the dependencies
- Run `npm run serve` to start the backend API
- Once the server starts, access the URL `localhost:8888` in Postman or browser
- Endpoints:
    - `localhost:8888/names` [GET] to list all the names
    - `localhost:8888/search` [POST] to search the most matched name by passing the JSON request (e.g. `{"input": "David Smith"}`)

### TERRAFORM
The IAC module to create the lambda function which hosts the API

- Provisioning:
    - Run `aws configure` and pass the Access Key and Secret Access Key to prompt
    - In `backend` , run `npm run build` to convert ts to js
    - Zip the source code `zip -r lambda.zip .` and ready for code upload
    - `terraform init`
    - `terraform apply` will create the lambda with zip file
    - Test the API by utilizing the lambda function url in the output `lambda_function_url`
- Decommission:
    - `terraform destroy`
    - Go to the aws console and remove the logs from `Log Group` in `CloudWatch`
