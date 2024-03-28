import Queue from "bull";

interface Payload {
  orderId: string;
}

const expiration = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expiration.process(async (job) => {
  console.log(
    "I want to publish order:expired event for order id: ",
    job.data.orderId
  );
});
