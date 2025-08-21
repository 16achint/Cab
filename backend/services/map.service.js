import axios from "axios";
import captionModel from "../models/captain.model.js";

const getAddressCoordinate = async (address) => {
    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
    )}&key=${apikey}`; // ✅ fixed $key to &key

    try {
        const response = await axios.get(url);

        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;

            return {
                lat: location.lat,
                lng: location.lng,
            };
        } else {
            throw new Error(`Google API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw new Error("Unable to fetch coordinates");
    }
};

const getDistanceTimeService = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("origin and destination is required");
    }
    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === "OK") {
            if (response.data.rows[0].elements[0] === "ZERO_RESULTS") {
                throw new Error("no route found");
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error("Unable to fetch distance and time");
        }
    } catch (error) {
        console.error("Error fetching distance:", error);
        throw new Error("Unable to fetch distance Time", error.message);
    }
};

const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("input is required");
    }
    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apikey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.predictions.map((prediction) => prediction.description).filter((value) => value);
        } else {
            throw new Error("Unable to fetch suggestions");
        }
    } catch (error) {
        console.error(err);
        throw err;
    }
};

const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    const captain = await captionModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371],
            },
        },
    });
    console.log("captain here", captain);
    return captain;
};

export { getAddressCoordinate, getDistanceTimeService, getAutoCompleteSuggestions, getCaptainsInTheRadius };
