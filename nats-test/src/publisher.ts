import nats from "node-nats-streaming";
import { TickerCreatedPublisher } from "../events/TickertCreatedPublisher";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publish = new TickerCreatedPublisher(stan);

  await publish.publish({ id: "123", title: "concert", price: 20 });

  //   const data = JSON.stringify({ id: "123", title: "concert", price: 20 });

  //   stan.publish("ticket:created", data, () => {
  //     console.log("Event published");
  //   });
});
