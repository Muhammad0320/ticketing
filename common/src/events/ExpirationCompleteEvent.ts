import { Subjects } from "./subjects";

// shit mf
export interface ExpirationCompleteEvent {
  subject: Subjects.ExpirationComplete;

  data: {
    orderId: string;
  };
}
