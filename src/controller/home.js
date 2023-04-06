import { responseHandler } from "../response/responseHandler";
export const home = async (req, res) => {
  try {
    return responseHandler(res, 200, "Success", true);
  } catch (error) {
    return responseHandler(res, 500, error.message, false);
  }
};
