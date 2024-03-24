import {
  Listener,
  Subjects,
  TicketCreatedEvent,
  TicketUpdatedEvent,
} from "@m0ticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/tickets";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;

  queueGroupName = "TicketCreated";

  async onMesage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    await Ticket.create({ id, title, price });

    msg.ack();
  }
}
