import { Ticket } from "../tickets";

it("implements an optimistic consurrency control ", async () => {
  // Crete tickets
  const ticket = await Ticket.buildTickets({
    userId: "shittt",
    price: 5,
    title: "thank you!",
  });

  // fetch ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make update to the same

  firstInstance?.set({ price: 10 });

  secondInstance?.set({ price: 15 });

  // save the first

  await firstInstance?.save();

  // then the second

  try {
    await secondInstance!.save();
  } catch (error) {
    return;
  }

  // expect an error for sure !

  throw new Error("The code must not react here");
});
