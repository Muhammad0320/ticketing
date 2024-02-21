import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

console.log("Hi mom");

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// muhammawwal@1123

export default app;
