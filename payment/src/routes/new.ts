import {
  BadRequestError,
  NotAuthorized,
  NotFound,
  OrderStatus,
  requestValidator,
  requireAuth,
} from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Order } from "../models/order";
import { stripe } from "../stripe";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    body("token").not().isEmpty().withMessage("please provide a token"),
    body("orderId").not().isEmpty().withMessage("User id is required"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFound();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Can't pay for a cancelled order");
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorized();
    }

    await stripe.charges.create({
      source: token,
      amount: order.price * 100,
      currency: "usd",
    });

    res.json({ status: 201, data: { status: "success" } });
  }
);

export { router as paymentRouter };
