const mongoose = require('mongoose');

// Define schema for store
const storeSchema = new mongoose.Schema({
    name: String,
    url: String,
    district: String,
  });


  const Store = mongoose.model('Store', storeSchema);
  module.exports = Store