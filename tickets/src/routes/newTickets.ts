import express, { Request, Response } from "express";
import { requireAuth } from "@m0ticketing/common";

const router = express.Router();

router.post("/", requireAuth, (req: Request, res: Response) => {
  res.status(200);
});
