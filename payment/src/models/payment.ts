import mongoose from "mongoose";

interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

type PaymentDoc = mongoose.Document & PaymentAttrs;

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  buildPayment(attrs: PaymentAttrs): Promise<PaymentDoc>;
}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "A payment must have an orderId"],
    },

    stripeId: {
      type: String,
      required: [true, "A payment must have a stripeId"],
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

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  paymentSchema
);

export { Payment };
