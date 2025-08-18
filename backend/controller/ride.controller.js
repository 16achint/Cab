import { createRideService, getFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";

const createRide = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(404).json({ error: error.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    try {
        console.log(req.body);
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        return res.status(201).json(ride);
    } catch (error) {
        return res.status(400).json({ message: error.message });
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

export { createRide, getRideFare };
