import {
  ExpirationCompleteEvent,
  Listener,
  Subjects,
} from "@m0ticketing/common";
import { Message } from "node-nats-streaming";

export class ExpirationCompletedListener extends Listener<ExpirationCompleteEvent> {
  readonly subjects = Subjects.ExpirationComplete;

  queueGroupName = "ExpirationCompleted";

  onMesage(data: ExpirationCompleteEvent["data"], msg: Message) {}
}
