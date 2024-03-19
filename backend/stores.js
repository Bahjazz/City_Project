const { Router } = require("express");
const StoreService = require("./StoreService");

const router = Router();

router.get("/", StoreService.getStore);
router.post("/create", StoreService.addStore);

module.exports = router;
