import { Listener, OrderCreatedEvent, Subjects } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../model/tickets";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subjects = Subjects.OrderCreated;

  queueGroupName = queueGroupName;

  async onMesage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: data.id });

    await ticket.save();

    msg.ack();
  }
}
