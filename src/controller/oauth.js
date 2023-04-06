import passport from "passport";
import { Strategy } from "passport-google-oauth20";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user.id);
});

export const google = passport.use(
  "google",
  new Strategy(
    {
      clientID:
        "18132177320-p7njbpcjrregjupsho8u759ca00ps455.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/api/v1/passport/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
