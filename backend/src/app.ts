import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { namesController } from "./controller";

// start up the RestAPI
const app = express()

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

// Define Routes
app.use("/", namesController);

// setup lambad hosting
const serverless = require('serverless-http');

module.exports.handler = serverless(app);