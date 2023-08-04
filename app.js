const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// const mongoose = require("mongoose");

// const DB_HOST =
//   "mongodb+srv://ArtemBielyi:25091992@cluster1.rq6z8r3.mongodb.net/db-contacts?retryWrites=true&w=majority";

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("Database connect succes"))
//   .catch((error) => console.log(error.message));
