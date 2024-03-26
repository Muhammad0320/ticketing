import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketsAttrs {
  userId: string;
  title: string;
  price: number;
}

interface TicketsDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}

interface TicketModel extends mongoose.Model<TicketsDoc> {
  buildTickets(attrs: TicketsAttrs): Promise<TicketsDoc>;
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

    orderId: String,
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

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.buildTicket = async (attrs: TicketsAttrs) => {
  const newDoc = await Ticket.create(attrs);

  return newDoc;
};

const Ticket = mongoose.model<TicketsDoc, TicketModel>("tickets", ticketSchema);

export { Ticket };
