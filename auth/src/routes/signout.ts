import express, { Request, Response } from "express";

const router = express.Router();

router.post("/signout", (req: Request, res: Response) => {
  res.send("hi mom");
});

export { router as signoutRouter };
