import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

console.log("Hi mom");

const port = 3000;

app.get("/api/users/currentUser", (req: Request, res: Response) => {
  res.send("Hi mom :)");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
