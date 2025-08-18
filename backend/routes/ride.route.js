import express from "express";
const route = express.Router();
import { body, query } from "express-validator";
import { createRide, getRideFare } from "../controller/ride.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

route.post(
    "/create-ride",
    authUser,
    body("pickup").isString().isLength({ min: 3 }).withMessage("invalid pickUp address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("invalid destination address"),
    body("vehicleType").isString().isIn(["car", "auto", "moto"]).withMessage("invalid vehicle Type"),
    createRide
);

route.get(
    "/get-fare",
    authUser,
    query("pickup").isString().isLength({ min: 3 }).withMessage("invalid pickUp address"),
    query("destination").isString().isLength({ min: 3 }).withMessage("invalid destination address"),
    getRideFare
);

export default route;
