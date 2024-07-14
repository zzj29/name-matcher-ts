import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { error } from "console";
import fs from "fs";

const app = express();
const port = 8888;

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

// Functions to load all names from json file
function loadNames() {
  const data = fs.readFileSync(__dirname+"/names.json", "utf8")
  return JSON.parse(data)
}