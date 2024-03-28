import { Listener, OrderCreatedEvent, Subjects } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expirationQueue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subjects = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  onMesage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getDate() - new Date().getTime();

    expirationQueue.add({ orderId: data.id }, { delay });

    msg.ack();
  }
}
