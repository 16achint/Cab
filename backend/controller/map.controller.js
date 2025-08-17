import {getAddressCoordinate,getDistanceTimeService,getAutoCompleteSuggestions} from "../services/map.service.js";
import { validationResult } from "express-validator";

const getCoordinate = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({ message: error.array() });
  }

  const { address } = req.query;
  try {
    const Coordinate = await getAddressCoordinate(address);
    res.status(200).json({ Coordinate });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getDistanceTime = async (req, res) => {
  try {
    const error = validationResult(req);
    console.log("check point0")
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    console.log("check point 1")
    const { origin, destination } = req.query;
    console.log("check" , origin, destination )
    const DistanceTime = await getDistanceTimeService(origin, destination);

    res.status(200).json(DistanceTime)
    
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getSuggestion = async (req,res) => {

  const error = validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({ error: error.array() });
  }

  const {input} = req.query;
  try {
    const suggestions = await getAutoCompleteSuggestions(input)
    res.status(200).json(suggestions)
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { getCoordinate,getDistanceTime , getSuggestion};
