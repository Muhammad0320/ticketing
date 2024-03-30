import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects,
} from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subjects = Subjects.OrderCancelled;

  queueGroupName = queueGroupName;

  async onMesage(data: OrderCancelledEvent["data"], msg: Message) {
    const order = Order.findById(data.id);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });

    msg.ack();
  }
}
