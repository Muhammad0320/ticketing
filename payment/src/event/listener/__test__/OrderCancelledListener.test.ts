import { OrderCancelledEvent, OrderStatus } from "@m0ticketing/common";
import { natsWrapper } from "../../../../natsWrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const data: OrderCancelledEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Cancelled,
    version: 0,
    ticket: {
      id: "string",
    },
  };

  const order = await Order.buildOrder({
    id: data.id,

    version: data.version,
    userId: "shitt",
    price: 33,
    status: OrderStatus.Created,
  });

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};
