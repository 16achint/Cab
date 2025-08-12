import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import cors from "cors";
import connectToDatabase from "./db/db.js";
import cookieParser from "cookie-parser";

connectToDatabase();
const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

import userRoutes from "./routes/user.route.js";
import captionRoutes from "./routes/caption.route.js";
app.use("/users", userRoutes);
app.use("/captain", captionRoutes);

app.get("/", (req, res) => {
  res.send("server is healthy 🍀");
});

export default app;
