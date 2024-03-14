import nats, { Message } from "node-nats-streaming";

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  const subscription = stan.subscribe("ticket:created");

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    typeof data === "string" &&
      console.log(`Event #${msg.getSequence()} received with data : ${data} `);
  });
});
