const express = require("express");
const router = express.Router();
const { makePurchase } = require("../controllers/purchaseController");

router.post("/", makePurchase);

module.exports = router;
