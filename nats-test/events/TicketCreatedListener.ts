import { Message } from "node-nats-streaming";
import { Listener } from "../../common/src/events/BaseListener";
import { TicketCreatedEvent } from "../../common/src/events/TicketCreatedEvents";
import { Subjects } from "../../common/src/events/subjects";

export class TickedCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subjects = Subjects.TicketCreated;

  queueGroupName = "paymentService";

  onMesage(data: TicketCreatedEvent["data"], msg: Message): void {
    console.log(`Event recieved!: ${data}`);

    console.log(data.id);

    msg.ack();
  }
}
