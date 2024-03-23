import express, { Request, Response } from "express";
import { Order, OrderStatus } from "../model/order";
import { NotAuthorized, NotFound } from "@m0ticketing/common";
import { OrderCancelledPublisher } from "../events/publisher/OrderCancelledPublisher";
import { natsWrapper } from "../../natsWrapper";

const router = express.Router();

router.delete("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate("ticket");

  if (!order) {
    throw new NotFound();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorized();
  }

  // logic

  order.status = OrderStatus.Cancelled;

  await order.save();

  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    status: order.status,
    ticket: { id: order.ticket.id },
  });

  res.status(204).json("success");
});

export { router as deleteOrderRouter };
