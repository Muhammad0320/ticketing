import express, { Request, Response } from "express";
import { currentUserRouter } from "./routes/currentUser";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";

const app = express();

app.use(express.json());

console.log("Hi mom");

const rootUserUrl = "/api/users";

app.use(rootUserUrl, signupRouter);
app.use(rootUserUrl, signoutRouter);
app.use(rootUserUrl, signinRouter);
app.use(rootUserUrl, currentUserRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// muhammawwal@1123

export default app;
