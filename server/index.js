const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const corsMiddlweare = require("./middleweare/cors.middleweare");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = config.get("serverPort");

app.use(corsMiddlweare);
app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose
      .connect(config.get("dbUrl"))
      .then(console.log("Connect mongoose"));

    app.listen(PORT, () => {
      console.log("Server started on ", PORT);
    });
  } catch (e) {
    console.log("Error type ", e);
  }
};

start();
