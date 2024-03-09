import express, { Request, Response } from "express";
import { Ticket } from "../../model/tickets";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({});

  res.status(200).json({ status: "success", tickets });
});
