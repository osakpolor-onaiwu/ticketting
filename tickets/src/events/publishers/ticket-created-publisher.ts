import {Publisher, Subjects, TicketCreatedEvent} from '@osastickettingapp/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

