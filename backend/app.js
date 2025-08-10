import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectToDatabase from "./db/db.js";
connectToDatabase();
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});
export default app;
