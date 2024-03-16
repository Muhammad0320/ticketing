import { randomBytes } from "crypto";
import nats from "node-nats-streaming";
import { TickedCreatedListener } from "../events/TicketCreatedListener";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection close!");

    process.exit();
  });

  new TickedCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
