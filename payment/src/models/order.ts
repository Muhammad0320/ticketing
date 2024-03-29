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
