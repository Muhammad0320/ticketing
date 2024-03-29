import mongoose from "mongoose";
import { natsWrapper } from "../../../../natsWrapper";
import { Order } from "../../../models/order";
import { OrderCreatedListener } from "../OrderCreatedListener";
import { OrderCreatedEvent, OrderStatus } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: "shitttt",
    ticket: { price: 90, id: new mongoose.Types.ObjectId().toHexString() },
    status: OrderStatus.Created,
    expiresAt: new Date().toISOString(),
  };

  const order = await Order.buildOrder({
    id: data.id,
    version: data.version,
    userId: data.userId,
    price: data.ticket.price,
    status: data.status,
  });

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, msg, order, data };
};

it("created an OrderCreatedEvent listener", async () => {
  const { listener, data, order, msg } = await setup();

  await listener.onMesage(data, msg);

  const updatedOrder = await Order.findById(order.id); //

  expect(updatedOrder?.id).toEqual(order.id);
});
