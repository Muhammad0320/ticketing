import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@m0ticketing/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import mongoose from "mongoose";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subjects = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMesage(data: OrderCreatedEvent["data"], msg: Message) {
    await Order.buildOrder({
      userId: new mongoose.Types.ObjectId().toHexString(),
      version: 0,
      price: data.ticket.price,
      status: OrderStatus.Created,
    });

    msg.ack();
  }
}
