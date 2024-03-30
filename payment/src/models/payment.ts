import mongoose from "mongoose";

interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

type PaymentDoc = mongoose.Document & PaymentAttrs;

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  buildPayment(attrs: PaymentAttrs): Promise<PaymentDoc>;
}
