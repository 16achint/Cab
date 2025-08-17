import rideModel from "../models/ride.model.js";
import { getDistanceTimeService } from "../services/map.service.js";
import crypto from "crypto";

async function getFare(pickUp, destination) {
    if (!pickUp || !destination) {
        throw new Error("PickUp and destination is required");
    }

    const distanceTime = await getDistanceTimeService(pickUp, destination);

    const baseFare = {
        auto: 15,
        car: 20,
        moto: 10,
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 7,
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5,
    };

    const fare = {
        auto: Math.round(
            baseFare.auto +
                (distanceTime.distance.value / 1000) * perKmRate.auto +
                (distanceTime.duration.value / 60) * perMinuteRate.auto
        ),
        car: Math.round(
            baseFare.car +
                (distanceTime.distance.value / 1000) * perKmRate.car +
                (distanceTime.duration.value / 60) * perMinuteRate.car
        ),
        moto: Math.round(
            baseFare.moto +
                (distanceTime.distance.value / 1000) * perKmRate.moto +
                (distanceTime.duration.value / 60) * perMinuteRate.moto
        ),
    };

    return fare;
}

function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

const createRideService = async ({ user, pickup, destination, vehicleType }) => {
    console.log(user, pickup, destination, vehicleType);
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All feild are required");
    }
    const fare = await getFare(pickup, destination);
    const ride = rideModel.create({
        user,
        otp: getOtp(4),
        pickup,
        destination,
        fare: fare[vehicleType],
    });

    return ride;
};

export { createRideService };
