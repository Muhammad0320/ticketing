import express, { Request, Response } from "express";

const router = express.Router();

router.get("/signin", (req: Request, res: Response) => {
  res.send("hi mom");
});

export { router as signinRouter };
