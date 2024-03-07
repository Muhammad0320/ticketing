import mongoose from "mongoose";

interface TicketsAttrs {
  userId: string;
  title: string;
  price: number;
}

interface TicketsDoc extends mongoose.Document {
  userId: string;
  title: string;
  price: number;
}

interface TicketModel extends mongoose.Model<TicketsDoc> {
  buildTickets(attrs: TicketsAttrs): TicketsDoc;
}
