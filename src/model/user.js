import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import joi from "joi";

export const joiUserSchema = joi.object({
  name: joi.string().trim().required(),
  username: joi.string().lowercase().trim().required(),
  password: joi.string().min(5).max(12).trim().required(),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .required()
    .trim()
    .label("Confirm password")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { versionKey: false }
);
userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("user", userSchema);
