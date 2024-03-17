import { Subjects } from "./subjects";
import { BasePublisher } from "./BasePublisher";
import { TicketCreatedEvent } from "./TicketCreatedEvents";

export class TickerCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;
}
