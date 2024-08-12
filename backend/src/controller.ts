import express, { Request, Response, NextFunction } from "express";
import { loadNames, searchName } from "./service";

const router = express.Router()

router.get("/names", (req: Request, res: Response, next: NextFunction) => {
  try {
    const names = loadNames().names
    if (!names) {
      return res.status(404).json({ error: "No names found from the JSON file." })
    }
    return res.status(200).json(names)
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.post("/search", (req: Request, res: Response, next: NextFunction) => {
  const { input } = req.body
  if (!input) {
    return res.status(400).send({ error: "Bad Request: Invalid input request" })
  } else {
    const names = loadNames().names;
    if (!names) {
      return res.status(404).json({ error: "No names found from the JSON file." })
    }
    const result = searchName(names, input)
    return res.status(200).json({ result })
  }
})

export const namesController = router;