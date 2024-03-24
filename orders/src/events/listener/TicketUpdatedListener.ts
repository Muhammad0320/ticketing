import { Listener, Subjects, TicketUpdatedEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/tickets";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subjects = Subjects.TicketUpdated;

  queueGroupName = "TicketUpdated";

  async onMesage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!ticket) {
      throw new Error(" Ticket not found ");
    }

    const { title, price } = data;

    ticket.set({ title, price });

    await ticket.save();

    msg.ack();
  }
}
