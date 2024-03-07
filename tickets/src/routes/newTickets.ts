import express, { Request, Response } from "express";
import { requireAuth, requestValidator } from "@m0ticketing/common";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Please provide a valid title"),

    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Please provide a valid price"),
  ],
  requestValidator,
  (req: Request, res: Response) => {
    res.status(201).json({ status: "succcess", json: {} });
  }
);
