import { Ticket } from "../../model/tickets";

const ticketBuilder = async () => {
  return await Ticket.create({ price: 20, title: "Football game" });
};

it("fetches order for a particular user", async () => {
  const ticketOne = await ticketBuilder();
  const ticketTwo = await ticketBuilder();
  const ticketThree = await ticketBuilder();
});
