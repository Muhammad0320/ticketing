import mongoose from "mongoose";
import { natsWrapper } from "../../../../natsWrapper";
import { Ticket } from "../../../model/tickets";
import { ExpirationCompletedListener } from "../ExpirationCompleteListener";
import { Order, OrderStatus } from "../../../model/order";
import { ExpirationCompleteEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new ExpirationCompletedListener(natsWrapper.client);

  const ticket = await Ticket.build({
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "shit concert",

    version: 0,
  });

  const order = await Order.build({
    userId: "shitt user",

    status: OrderStatus.Created,
    expiresAt: new Date(),

    ticket,
    version: 0,
  });

  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id,
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };
};
