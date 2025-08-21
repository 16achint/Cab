import { createRideService, confirmRideService, getFare, startRideService } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getAddressCoordinate, getCaptainsInTheRadius } from "../services/map.service.js";
import rideModel from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";

const createRide = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(404).json({ error: error.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    console.log("req", req);
    try {
        // Do all async work first
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });

        const pickupCoordinates = await getAddressCoordinate(pickup);
        const captainInRadius = await getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);

        console.log("captainInRadius", captainInRadius);

        ride.otp = "";
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user");
        console.log("rideWithUser", rideWithUser);

        captainInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser,
            });
        });
        res.status(201).json(ride);
    } catch (err) {
        console.log("hello achint 1");
        console.log("err", err);
        return res.status(500).json({ message: err.message });
    }
};

const confirmRide = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(404).json({ error: error.array() });
    }

    const { rideId } = req.body;
    console.log("rideId", rideId);
    try {
        const ride = await confirmRideService({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, { event: "ride-confirmed", data: ride });
        return res.status(200).json(ride);
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: err.message });
    }
};

const startRide = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(404).json({ error: error.array() });
    }

    const { rideId, otp } = req.query;
    try {
        const ride = await startRideService({ rideId, otp, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, { event: "ride-started", data: ride });
        console.log("ride", ride);
        return res.status(200).json(ride);
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: error.message });
    }
};

const getRideFare = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).json({ error: error.array() });
    }
    try {
        const { pickup, destination } = req.query;
        const fare = await getFare(pickup, destination);

        if (!fare) {
            return res.status(401).json("fare not found");
        }
        res.status(200).json(fare);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export { createRide, getRideFare, confirmRide, startRide };
