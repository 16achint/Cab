import express from "express";
const route = express.Router();
import { body } from "express-validator";
import { createRide } from "../controller/ride.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

route.post(
    "/create-ride",
    authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("invalid pickUp address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("invalid destination address"),
    body("vehicleType").isString().isIn(["car", "auto", "moto"]).withMessage("invalid vehicle Type"),
    createRide
);

export default route;
