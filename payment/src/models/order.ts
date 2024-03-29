import { OrderStatus } from "@m0ticketing/common";
import mongoose from "mongoose";

type OrderAttrs = {
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
};

type OrderDocs = mongoose.Document & OrderAttrs;

interface OrderModel extends mongoose.Model<OrderDocs> {}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "An order must belong to a user"],
  },

  price: {
    type: Number,
    required: [true, "An order have a price"],
  },

  status: {
    type: String,
    required: [true, "An order must have a status"],
  },
});
