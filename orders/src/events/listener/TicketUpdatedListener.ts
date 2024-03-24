import { Listener, Subjects, TicketUpdatedEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/tickets";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subjects = Subjects.TicketUpdated;

  queueGroupName = "TicketUpdated";

  async onMesage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.find({
      id: data.id,
      version: data.version - 1,
    });

    if (!ticket) {
      throw new Error(" Ticket not found ");
    }

    const { id, title, price, version } = data;

    ticket.set({ id, title, price, version });

    await ticket.save();

    msg.ack();
  }
}
