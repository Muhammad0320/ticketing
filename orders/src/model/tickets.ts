import mongoose from "mongoose";

interface TicketAttrs {
  price: number;

  title: string;
}

type TicketDoc = mongoose.Document & TicketAttrs;

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}
