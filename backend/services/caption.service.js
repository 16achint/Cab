import captionModel from "../models/captain.model.js";

const createCaption = async ({
  firstname,
  lastname,
  email,
  password,
  vehicle,
}) => {
  const { color, plate, capacity, vehicleType } = vehicle;

  const fields = [
    { name: "firstname", value: firstname },
    { name: "email", value: email },
    { name: "password", value: password },
    { name: "vehicle.color", value: color },
    { name: "vehicle.plate", value: plate },
    { name: "vehicle.capacity", value: capacity },
    { name: "vehicle.vehicleType", value: vehicleType },
  ];

  const missingFields = fields
    .filter(
      ({ value }) =>
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
    )
    .map(({ name }) => name);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  const caption = captionModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return caption;
};

export { createCaption };
