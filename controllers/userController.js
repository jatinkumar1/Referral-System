const User = require("../models/User");
const Earning = require("../models/Earning");


exports.signup = async (req, res) => {
  try {
    const { name, email , referredBy } = req.body;
    const referrals = referredBy ? await User.find({ referredBy }) : [];

    if (referredBy && referrals.length >= 8) {
      return res.status(400).json({ error: "Referrer has reached max referral limit" });
    }

    const user = await User.create({ name, email, referredBy });
    if (referredBy) {
      await User.findByIdAndUpdate(referredBy, { $push: { referrals: user._id } });
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReferrals = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("referrals");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEarnings = async (req, res) => {
  try {
    const userId = req.params.id;

    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ error: "Invalid user ID" });
    // }
    const earnings = await Earning.find({ user: userId }).populate("sourceUser");
    const total = earnings.reduce((sum, e) => sum + e.amount, 0);
    res.json({ total, breakdown: earnings });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAnalytics = async(req,res) =>{
  try{
    // const Earning  = require("../models/Earning");
    const userId = req.params.id;

    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ error: "Invalid user ID" });
    // }
    const earnings = await Earning.find({user:userId}).populate("sourceUser");
    // const total = earnings.reduce((sum, e) => sum + e.amount, 0);
    
    // totalLevel Breakdown
    // const allLevels = earnings.reduce((acc,e) => {
    //   acc[`level${e.level}`] = (acc[`level${e.level}`] || 0) + e.amount;
    //   return acc;
    // },{})

    const referralSources = {};
    let totals = 0;
    let level1Cnt = 0;
    let level2Cnt = 0;
    for(const e of earnings){
      totals += e.amount;
      const level = `level${e.level}`;

      if(level ===  'level1'){
        level1Cnt++;
      }if(level === 'level2'){
        level2Cnt++;
      }

      const referralName = e.sourceUser?.name || "Not Available";

      if(!referralSources[level]){
        referralSources[level] = {};
      }
      if(!referralSources[level][referralName]){
        referralSources[level][referralName] = 0;
      }
      referralSources[level][referralName] += e.amount;
    }

    res.json({
      totalEarnings : totals,
      level1Cnt,
      level2Cnt,
      earningsByLevel : referralSources
    })
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
