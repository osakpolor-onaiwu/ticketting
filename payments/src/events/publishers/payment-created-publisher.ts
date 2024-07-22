import { Subjects, Publisher, PaymentCreatedEvent} from '@osastickettingapp/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}