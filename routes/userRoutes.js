const express = require("express");
const router = express.Router();
const { signup, getReferrals, getEarnings,getAnalytics  } = require("../controllers/userController");

router.post("/signup", signup);
router.get("/:id/referrals", getReferrals);
router.get("/:id/earnings", getEarnings);
router.get("/:id/analytics",getAnalytics);

module.exports = router;