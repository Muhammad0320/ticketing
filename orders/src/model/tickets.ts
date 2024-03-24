import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";

interface TicketAttrs {
  price: number;
  id: string;

  title: string;
}

export type TicketDoc = mongoose.Document &
  TicketAttrs & {
    isReserved(): Promise<Boolean>;
  };

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): Promise<TicketDoc>;
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

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

ticketSchema.statics.build = async function (attrs: TicketAttrs) {
  await Ticket.create({ _id: attrs.id, ...attrs });
};

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this,

    status: {
      $in: [
        OrderStatus.AwaitingPayment,
        OrderStatus.Created,
        OrderStatus.completed,
      ],
    },
  });

  return !!existingOrder;
};

export { Ticket };
