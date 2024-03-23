import {
  BasePublisher,
  Subjects,
  OrderCreatedEvent,
} from "@m0ticketing/common";

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
  readonly subjects = Subjects.OrderCreated;
}
