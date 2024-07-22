import express from "express";
// catch async errors
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler, currentUser } from "@osastickettingapp/common";
import { createChargeRouter } from "./routes/create";
const app = express();

//allow express to be aware that it is behind a proxy of ingress nginx and trust traffic as being secure
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false, //we set this to false because we are usin JWT whick is already encrypted
    secure: process.env.NODE_ENV !== 'test', //ensure cookie is used only when user visit via https connection
  })
);

app.use(currentUser)
app.use(createChargeRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export  { app };