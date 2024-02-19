import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

console.log("Hi mom");

console.log("Thnaks");

app.get("/api/users/currentUser", (req: Request, res: Response) => {
  res.send("Hi mom :)");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// muhammawwal@1123
