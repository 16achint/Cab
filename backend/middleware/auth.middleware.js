import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import captionModel from "../models/captain.model.js";
import blacklistTokenSchema from "../models/blacklistToken.model.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const isBlacklisted = await blacklistTokenSchema.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const isBlacklisted = await blacklistTokenSchema.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captionModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export { authUser, authCaptain };
