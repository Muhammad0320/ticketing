import nats from "node-nats-streaming";
import { TickerCreatedPublisher } from "../events/TicketCreatedPublisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publish = new TickerCreatedPublisher(stan);

  await publish.publish({
    id: "123",
    title: "concert",
    userId: "s",
    price: 20,
  });
});
