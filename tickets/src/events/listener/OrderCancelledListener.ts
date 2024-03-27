import { Listener, OrderCancelledEvent, Subjects } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";
import { Ticket } from "../../../model/tickets";
import { Message } from "node-nats-streaming";
import { TicketUpdatedPublisher } from "../publisher/TicketUpdatedListener";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subjects = Subjects.OrderCancelled;

  queueGroupName = queueGroupName;

  async onMesage(data: OrderCancelledEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: undefined });

    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      version: ticket.version,
      price: ticket.price,
      orderId: ticket.orderId,
      userId: ticket.userId,
    });

    msg.ack();
  }
}
