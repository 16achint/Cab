import mongoose from "mongoose";

export default async function connectToDatabase() {
  const mongoUri = process.env.MONGO_DB;
  if (!mongoUri) {
    throw new Error("MONGO_DB environment variable is not defined");
  }
  try {
    await mongoose.connect(mongoUri).then(() => {
      console.log("connected to mongoose");
    });
  } catch (error) {
    console.log(error.message);
  }
}
