import express from "express";
const route = express.Router();
import { body, query } from "express-validator";
import { createRide, getRideFare, confirmRide, startRide, endRide } from "../controller/ride.controller.js";
import { authCaptain, authUser } from "../middleware/auth.middleware.js";

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

route.post("/confirm", authCaptain, body("rideId").isMongoId().withMessage("Invalid ride id"), confirmRide);

route.get(
    "/start-ride",
    authCaptain,
    query("rideId").isMongoId().withMessage("Invalid ride id"),
    query("otp").isString().isLength({ min: 3, max: 6 }).withMessage("Invalid OTP"),
    startRide
);

route.post("/end-ride", authCaptain, body("rideId").isMongoId().withMessage("Invalid ride id"), endRide);

export default route;
