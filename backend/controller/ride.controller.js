import { createRideService } from "../services/ride.service.js";
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

export { createRide };
