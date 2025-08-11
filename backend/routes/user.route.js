import { body } from "express-validator";
import { register, loginUser } from "../controller/user.controller.js";

import { Router } from "express";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invaild email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("first name must be 3 char"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 char atleast"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invaild email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 char atleast"),
  ],
  loginUser
);
export default router;
