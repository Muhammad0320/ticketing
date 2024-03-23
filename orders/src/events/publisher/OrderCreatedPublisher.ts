import {
  BasePublisher,
  Subjects,
  OrderCreatedEvent as OrderCreatedEventType,
} from "@m0ticketing/common";

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEventType> {
  readonly subjects = Subjects.OrderCreated;
}
