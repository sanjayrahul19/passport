import { User } from "../model/user";
import bcrypt from "bcrypt";
import { responseHandler } from "../response/responseHandler";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const password = await bcrypt.compare(req.body.password, user.password);
      if (password) {
        const payload = {
          id: user._id,
          role: user.role,
        };
        const token = await jwt.sign(payload, "sanjay");
        return responseHandler(res, 200, "LoggedIn Successfully", true, {
          _id: user._id,
          username: user.username,
          name: user.name,
          role: user.role,
          token: "Bearer " + token,
        });
      } else {
        return responseHandler(res, 401, "Incorrect password", false);
      }
    } else {
      return responseHandler(res, 404, "User not found", false);
    }
  } catch (err) {
    return responseHandler(res, 500, err.message, false);
  }
};
