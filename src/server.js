import express from "express";
const app = express();
const PORT = 8000;
import { connectDB } from "./config/db";
import { router } from "./router/router";
import passport from "passport";
import session from "express-session";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "sanjay", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/api/v1/passport", router);

app.listen(PORT, () => {
  console.log("Server is up and running " + PORT);
});
