import mongoose from "mongoose";

interface TicketAttrs {
  price: number;

  title: string;
}

export type TicketDoc = mongoose.Document & TicketAttrs;

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Tickets must have a title"],
  },

  price: {
    type: String,
    required: [true, "Tickets must have a price"],
  },
});
