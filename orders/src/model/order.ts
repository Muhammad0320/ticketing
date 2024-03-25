import { OrderStatus } from "@m0ticketing/common";
import mongoose from "mongoose";
import { TicketDoc } from "./tickets";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export { OrderStatus };

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

type OrderDoc = mongoose.Document & OrderAttrs;

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): Promise<OrderDoc>;
  version: number;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "An order must belong to a user"],
    },

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: [true, "An order must have a status"],
    },

    expiredAt: mongoose.Schema.Types.Date,

    ticket: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Ticket",

      required: [true, "An order must belong to a ticket"],
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

orderSchema.set("versionKey", "version");

orderSchema.plugin(updateIfCurrentPlugin);

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

orderSchema.statics.build = async function (attrs: OrderAttrs) {
  await Order.create(attrs);
};

export { Order };
