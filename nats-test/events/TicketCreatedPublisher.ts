import {
  BasePublisher,
  Subjects,
  TicketCreatedEvent,
} from "@m0ticketing/common";

export class TickerCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;
}
