import {
  Listener,
  Subjects,
  TicketCreatedEvent,
  TicketUpdatedEvent,
} from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;

  queueGroupName = "TicketCreated";

  onMesage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
  }
}
