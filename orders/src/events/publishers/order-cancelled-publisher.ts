import { Publisher, OrderCancelledEvent, Subjects } from "@osastickettingapp/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}