const User = require("../models/User");
const Earning = require("../models/Earning");

exports.makePurchase = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId).populate("referredBy");

    if (!user) return res.status(404).json({ error: "User not found." });
    if (amount >= 1000) {
      const level1 = user.referredBy;

      if (level1) {
        const level1Earning = 0.05 * amount;
        await Earning.create({ user: level1._id, sourceUser: user._id, level: 1, amount: level1Earning, purchaseAmount: amount });

        const level2 = await User.findById(level1.referredBy);
        if (level2) {
          const level2Earning = 0.01 * amount;
          await Earning.create({ user: level2._id, sourceUser: user._id, level: 2, amount: level2Earning, purchaseAmount: amount });
        }
      }
    };
    res.json({
      message:
        amount >= 1000
          ? "Purchase successful and earnings distributed."
          : "Purchase successful, but amount is less than 1000 — no referral earnings."
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
