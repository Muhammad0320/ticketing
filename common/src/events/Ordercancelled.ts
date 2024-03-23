import { Subjects } from "./subjects";
import { OrderStatus } from "./types/OrderStatus";

export interface OrderCancelled {
  subject: Subjects.OrderCancelled;

  data: {
    id: string;
    status: OrderStatus.Cancelled;

    ticket: {
      id: string;
    };
  };
}
