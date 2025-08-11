import userModel from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;
  const { firstname, lastname } = fullname;

  const hashpassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname,
    lastname,
    email,
    password: hashpassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ user, token });
};
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "invalid email or password" });
  }
  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const token = user.generateAuthToken();

  res.status(200).json({ token, user });
};

export { register, loginUser };
