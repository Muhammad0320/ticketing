import {
  BasePublisher,
  OrderCancelledEvent,
  Subjects,
} from "@m0ticketing/common";

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
  readonly subjects = Subjects.OrderCancelled;
}
