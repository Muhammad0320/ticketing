import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@m0ticketing/common";
import { Order } from "../../models/order";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subjects = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMesage(data: OrderCreatedEvent["data"], msg: Message) {
    await Order.buildOrder({
      userId: data.userId,
      version: data.version,
      price: data.ticket.price,
      status: data.status,
      id: data.id,
    });

    msg.ack();
  }
}
