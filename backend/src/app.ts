import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { error } from "console";
import fs from "fs";

const app = express();
const port = 8888;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => console.log(`App is running on port ${port}`));

app.get("/", (req: Request, res: Response, next: NextFunction) =>
  res.status(200).json({ message: "api is live" })
);

app.get("/names", (req: Request, res: Response, next: NextFunction) => {
  try{
    const names = loadNames().names;
    if (!names) {
      return res.status(404).json({error:"No names found from the json file."})
    }
    return res.status(200).json(names)
  } catch(error) {
    return res.status(500).json({error})
  }
}
);

app.post("/search", (req: Request, res: Response, next: NextFunction) => {
  const { input } = req.body
  if(!input){
    return res.status(400).send({error: "Bad Request: Invalid input request"})
  } else {
    const names = loadNames().names;
    if (!names) {
      return res.status(404).json({error:"No names found from the json file."})
    }
    const result = searchName(names, input)
    return res.status(200).json({result})
  }
}
);

// Function to load all names from json file
function loadNames() {
  const data = fs.readFileSync(__dirname+"/names.json", "utf8")
  return JSON.parse(data)
}

//Function to search name based on input
function isChinese(char: string): boolean {
  return new RegExp(/\p{Script=Han}/u).test(char)
}

function splitName(name: string): string[] {
  let resultList: string[] = []
  // split the string by spaces/tabs
  const nameList = name.split(/\s+/)
  nameList.forEach(char => {
    // split Chinese by characters
    if (isChinese(char)) {
        resultList = resultList.concat(char.split(""))
    } else {
        resultList.push(char.toLowerCase())
    }
  })
  return resultList
}

function searchName(names: string[], input:string) : string {
  let result = ""

  // split input
  const inputCharList = splitName(input)

  //loop through names.json
  names.forEach(name => {
    const nameList = splitName(name)
    if (inputCharList.every(item => nameList.includes(item))) {
      result = name
    }
  })
  return result
};
