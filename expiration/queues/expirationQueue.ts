import Queue from "bull";

interface Payload {
  orderId: string;
}

const expiration = new Queue("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});
