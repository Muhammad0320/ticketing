import mongoose from "mongoose";

interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: "Ticket";
}

type OrderDoc = mongoose.Document & OrderAttrs;

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "An order must belong to a user"],
  },

  status: {
    type: String,
    required: [true, "An order must have a status"],
  },

  expiredAt: mongoose.Schema.Types.Date,

  ticket: {
    type: mongoose.Schema.Types.ObjectId,

    required: [true, "An order must belong to a ticket"],
  },
});

const Order = mongoose.model<OrderDoc, OrderModel>("order", orderSchema);

export { Order };
