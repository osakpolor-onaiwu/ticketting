import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@osastickettingapp/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
