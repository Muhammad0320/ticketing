import {
  BasePublisher,
  PaymentCreatedEvent,
  Subjects,
} from "@m0ticketing/common";

export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent> {
  readonly subjects = Subjects.PaymentCreated;
}
