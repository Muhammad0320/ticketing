import {
  BasePublisher,
  Subjects,
  TicketUpdatedEvent,
} from "@m0ticketing/common";

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
  readonly subjects = Subjects.TicketUpdated;
}
