import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects,
} from "@m0ticketing/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../model/order";

export class PaymentCreatedListenenr extends Listener<PaymentCreatedEvent> {
  readonly subjects = Subjects.PaymentCreated;

  queueGroupName = "orderService";

  async onMesage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("order not found");
    }

    order.set({ status: OrderStatus.completed });

    order.save();

    msg.ack();
  }
}
