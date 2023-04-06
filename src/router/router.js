import { Router } from "express";
import { signup } from "../controller/signup";
import { jwt } from "../config/passport";
import { admin } from "../config/passport";
import { login } from "../controller/login";
import { home } from "../controller/home";
import { google } from "../controller/oauth";
export const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/home", jwt.authenticate("jwt", { session: false }), home);

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router.get("/protected", isLoggedIn, (req, res) => {
  res.send("hello");
});
router.get("/failure", (req, res) => {
  res.send("failure");
});

router.get(
  "/google/callback",
  google.authenticate("google", {
    successRedirect: "/api/v1/passport/protected",
    failureRedirect: "/api/v1/passport/failure",
  })
);

router.get(
  "/google",
  google.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("goodbye");
});
