import { Listener, OrderCancelledEvent, Subjects } from "@m0ticketing/common";
import { queueGroupName } from "./queueGroupName";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subjects = Subjects.OrderCancelled;

  queueGroupName = queueGroupName;

  onMesage() {}
}
