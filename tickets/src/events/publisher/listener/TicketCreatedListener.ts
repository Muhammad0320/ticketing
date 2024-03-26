import { Listener, Subjects, TicketCreatedEvent } from "@m0ticketing/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../model/tickets";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;

  queueGroupName = "TicketCreated";

  async onMesage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    await Ticket.build({ id, title, price, version: 0 });

    msg.ack();
  }
}
