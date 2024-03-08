import mongoose from "mongoose";
import { UserDoc } from "../../auth/src/model/User";

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
  buildTickets(attrs: TicketsAttrs): Promise<UserDoc>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a valid title"],
    },

    price: {
      type: String,
      required: [true, "Please provide a valid price"],
    },

    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.buildTicket = async (attrs: TicketsAttrs) => {
  const newDoc = await Ticket.create(attrs);

  return newDoc;
};

const Ticket = mongoose.model<TicketsDoc, TicketModel>("tickets", ticketSchema);

export { Ticket };
