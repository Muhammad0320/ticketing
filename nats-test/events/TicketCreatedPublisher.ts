import { Subjects } from "../../common/src/events/subjects";
import { BasePublisher } from "../../common/src/events/BasePublisher";
import { TicketCreatedEvent } from "../../common/src/events/TicketCreatedEvents";

export class TickerCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;
}
