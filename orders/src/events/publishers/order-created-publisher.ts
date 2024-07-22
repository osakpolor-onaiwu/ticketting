import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@osastickettingapp/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}



