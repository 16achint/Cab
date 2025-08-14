import captionModel from "../models/captain.model.js";
import { createCaption } from "../services/caption.service.js";
import { validationResult } from "express-validator";
import blacklistToken from "../models/blacklistToken.model.js";

const registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptionExist = await captionModel.findOne({ email });
  if (isCaptionExist) {
    return res.status(400).json({ message: "caption already exist" });
  }

  const { firstname, lastname } = fullname;

  const hashpassword = await captionModel.hashPassword(password);

  const caption = await createCaption({
    firstname,
    lastname,
    email,
    password: hashpassword,
    vehicle,
  });

  const token = caption.generateAuthToken();

  res.status(201).json({ caption, token });
};

const loginCaption = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const caption = await captionModel.findOne({ email }).select("+password");

  if (!caption) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  const isMatched = await caption.comparePassword(password);

  if (!isMatched) {
    return res.status(401).json({ message: "invalid password" });
  }
  const token = caption.generateAuthToken();

  const { password: _, ...captionData } = caption.toObject();

  res.cookie("token", token);

  res.status(200).json({ token, captain: captionData });
};

const getCaptionprofile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

const logoutCaption = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistToken.create({ token: token });

  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

export { registerCaptain, loginCaption, getCaptionprofile, logoutCaption };
