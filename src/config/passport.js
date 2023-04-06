import passport from "passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { User } from "../model/user";
import { responseHandler } from "../response/responseHandler";

const JWTStrategy = Strategy;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "sanjay",
};

export const jwt = passport.use(
  "jwt",
  new JWTStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload, "payload");
    const user = User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

export const admin = passport.use(
  "admin",
  new JWTStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload);
    const user = await User.findById(jwt_payload.id);
    if (user) {
      if (user.role !== "admin") {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  })
);
