import express, { Request, Response } from "express";
import {
  requireAuth,
  requestValidator,
  currentUser,
} from "@m0ticketing/common";
import { body } from "express-validator";
import { Ticket } from "../../model/tickets";

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
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const id = req.currentUser!.id;

    const newTicket = await Ticket.buildTickets({
      title,
      price,
      userId: id,
    });

    res.status(201).json({ status: "succcess", json: newTicket });
  }
);
