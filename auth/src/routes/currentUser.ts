import express, { Request, Response } from "express";

const router = express.Router();

router.get("/currentUser", (req: Request, res: Response) => {
  res.send("hi mom");
});

export { router as currentUserRouter };
