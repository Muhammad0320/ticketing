import {
  BasePublisher,
  Subjects,
  TicketCreatedEvent,
} from "@m0ticketing/common";

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;
}
