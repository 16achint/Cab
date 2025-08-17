import express from "express";
const route = express.Router();
import { body } from "express-validator";

route.post(
    "/create-ride",
    body("userId").isString().isLength({ min: 24, max: 24 }).withMessage("invaild user id"),
    body("pickup").isString().isLength({ min: 3 }).withMessage("invalid pickUp address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("invalid destination address")
);

export default route;
