import { Order } from "../model/order";
import { requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ ticket: req.currentUser!.id });

  res.status(200).json({
    status: "success",

    orders,
  });
});

export { router as indexOrderRouter };
