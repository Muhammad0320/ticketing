import { OrderCancelledEvent, OrderStatus } from "@m0ticketing/common";
import { natsWrapper } from "../../../../natsWrapper";
import { OrderCancelledListener } from "../OrderCancelledListener";
import mongoose from "mongoose";
import { Order } from "../../../models/order";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = await Order.buildOrder({
    id: new mongoose.Types.ObjectId().toHexString(),

    version: 0,
    userId: "shitt",
    price: 33,
    status: OrderStatus.Created,
  });

  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    status: OrderStatus.Cancelled,
    version: 1,
    ticket: {
      id: "string",
    },
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, data, msg };
};

it("updates order status to cancelled", async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMesage(data, msg);

  const updatedOrder = await Order.findById(order.id); //

  expect(updatedOrder!.price).toEqual(order.price);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
