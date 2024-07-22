import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@osastickettingapp/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
