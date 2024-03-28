import { Listener, OrderCreatedEvent, Subjects } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subjects = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  onMesage(data: OrderCreatedEvent["data"], msg: Message) {
    msg.ack();
  }
}
