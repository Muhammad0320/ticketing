import express, { Request, Response } from "express";
import { Order } from "../model/order";
import { NotAuthorized, NotFound, requireAuth } from "@m0ticketing/common";

const router = express.Router();

router.get("/:orderId", requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    throw new NotFound();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorized();
  }

  res.status(200).json({ status: "success", data: order });
});

export { router as showOrderRouter };
