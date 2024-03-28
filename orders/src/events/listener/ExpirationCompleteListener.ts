import {
  ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  Subjects,
} from "@m0ticketing/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/order";

export class ExpirationCompletedListener extends Listener<ExpirationCompleteEvent> {
  readonly subjects = Subjects.ExpirationComplete;

  queueGroupName = "ExpirationCompleted";

  async onMesage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error(" Order not found ");
    }

    order.set({ ticket: null, status: OrderStatus.Cancelled });

    order.save();

    msg.ack();
  }
}
