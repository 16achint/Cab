import { body } from "express-validator";
import { register, loginUser, logoutUser, getUserprofile } from "../controller/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

import { Router } from "express";

const router = Router();

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("invaild email"),
        body("fullname.firstname").isLength({ min: 3 }).withMessage("first name must be 3 char"),
        body("password").isLength({ min: 6 }).withMessage("password must be 6 char atleast"),
    ],
    register
);
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("invaild email"),
        body("password").isLength({ min: 6 }).withMessage("password must be 6 char atleast"),
    ],
    loginUser
);

router.get("/profile", authUser, getUserprofile);
router.get("/logout", authUser, logoutUser);

export default router;
