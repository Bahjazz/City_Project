const Store = require("./store");


const addStore = async (req, res) => {
  const storeData = {
    name: req.body.name,
    url: req.body.url,
    district: req.body.district,
  };
  try {
    const store = await Store.create(storeData);
    res.status(200).json({ store: store._id });
  } catch (error) {
    res.status(400).json("Error creating store");
  }
};

const getStore = async (req, res) => {
  try {
    const stores = await Store.find({});
    res.status(200).json({ stores: stores });
  } catch (error) {
    console.error("Error getting stores:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addStore, getStore };
