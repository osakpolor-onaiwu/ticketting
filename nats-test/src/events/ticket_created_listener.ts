import nats, { Message, Stan } from "node-nats-streaming";
import { Listener } from "./base_listener";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: TicketCreatedEvent['subject'] = Subjects.TicketCreated;
  queueGroupName: string = "payments-service";
  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log("Event data", data);
    msg.ack();
  }
}