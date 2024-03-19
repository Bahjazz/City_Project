const mongoose = require("mongoose");
const jsonData = require("./store.json");
const Store = require('./store')

// Connect to MongoDB
const connection_url =
  "mongodb+srv://jkpgcity:HuS8rknxEQcXIPiD@cluster0.ahursib.mongodb.net/";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Insert data into MongoDB
    await Store.insertMany(jsonData);
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
});

module.exports = db;
