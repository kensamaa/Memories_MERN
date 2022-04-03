import mongoose from "mongoose";
const connectionString = "mongodb://localhost:27017/Memories";
const config = { useunifiedtopology: true, useNewUrlParser: true };
const DB = mongoose.connection;
mongoose.connect(connectionString, config).catch((e) => {
  console.error("Connection error", e.message);
});
mongoose.set("useFindAndModify", false);
DB.on("open", () => console.log("you are connected to mongo"))
  .on("close", () => console.log("you are disconnected to mongo"))
  .on("error", console.error.bind(console, "MongoDB connection error:"));

const db = mongoose.connection;

module.exports = db;
