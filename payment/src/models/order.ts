import { OrderStatus } from "@m0ticketing/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

type OrderAttrs = {
  version: number;
  userId: string;
  price: number;
  status: OrderStatus;
};

type OrderDocs = mongoose.Document & OrderAttrs;

interface OrderModel extends mongoose.Model<OrderDocs> {
  buildOrder(attrs: OrderAttrs): Promise<OrderDocs>;
}

const orderSchema = new mongoose.Schema(
  {
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

orderSchema.statics.buildOrder = async (
  attrs: OrderAttrs & { id: string }
): Promise<OrderDocs> => {
  return await Order.create({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    status: attrs.status,
  });
};

const Order = mongoose.model<OrderDocs, OrderModel>("Order", orderSchema);

export { Order };
