import express from "express";
import "express-async-errors";
import { currentUserRouter } from "./routes/currentUser";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { signinRouter } from "./routes/signin";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFound } from "./errors/NotFound";

const app = express();

app.use(express.json());

console.log("Hi mom");

const rootUserUrl = "/api/users";

app.use(rootUserUrl, signupRouter);
app.use(rootUserUrl, signinRouter);
app.use(rootUserUrl, signoutRouter);

app.all("*", () => {
  throw new NotFound();
});

app.use(rootUserUrl, currentUserRouter);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// muhammawwal@1123

export default app;
