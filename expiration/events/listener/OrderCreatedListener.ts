import { Listener, OrderCreatedEvent, Subjects } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expirationQueue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subjects = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  onMesage(data: OrderCreatedEvent["data"], msg: Message) {
    expirationQueue.add({ orderId: data.id });

    msg.ack();
  }
}
