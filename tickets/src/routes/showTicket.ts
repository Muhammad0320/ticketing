import express, { Request, Response } from "express";
import { Ticket } from "../../model/tickets";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  res.status(200).json({ ticket });
});

export { router as showTicketRouter };
