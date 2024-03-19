const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");
const mongoose = require("mongoose");

const app = express();

const storeRoutes = require("./stores");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/stores", storeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8081, function () {
  console.log("Server started on port 8081");
});
