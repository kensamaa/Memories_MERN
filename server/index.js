import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/post.js";
import { LogInfo, LogError } from "./helpers/logs.js";
LogInfo("server start");
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//routes
app.use("/posts", postRoutes);

//setup db
const connectionString = "mongodb://localhost:27017/Memories";
const config = { useunifiedtopology: true, useNewUrlParser: true };
const DB = mongoose.connection;
mongoose.connect(connectionString, config).catch((e) => {
  LogError("Connection error", e.message);
});
DB.on("open", () => LogInfo("you are connected to mongo"))
  .on("close", () => LogInfo("you are disconnected to mongo"))
  .on("error", console.error.bind(console, "MongoDB connection error:"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => LogInfo(`Server running on port ${PORT}`));
