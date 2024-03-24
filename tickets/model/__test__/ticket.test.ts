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

  throw new Error(" Must not react this point");
});

it("increases version number on multiple saves", async () => {
  const ticket = await Ticket.buildTickets({
    price: 20,
    title: "Ticket",
    userId: "shitttt",
  });

  expect(ticket.version).toEqual(0);

  ticket.set({ price: 10 });

  await ticket.save();

  expect(ticket.version).toEqual(1);

  await ticket.save();

  expect(ticket.version).toEqual(2);
});
