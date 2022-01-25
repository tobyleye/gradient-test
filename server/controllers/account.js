const { User } = require("../models");
const tokenUtils = require("../utils/token");

exports.register = async (req, res) => {
  let { email, password } = req.body;
  if (!email && !password) {
    res.status(400);
    return res.end();
  }

  try {
    let user = await new User({ email, password }).save();
    return res.json({
      token: tokenUtils.create({
        id: user.id,
      }),
      user,
    });
  } catch(err){
    return res.status(400).end()
  } 
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  if (!email && !password) {
    res.status(400);
    return res.end();
  }

  let user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    return res.end();
  }

  let result = await user.comparePassword(password).catch(() => false);

  if (!result) {
    res.status(401);
    return res.end();
  }

  return res.json({
    token: tokenUtils.create({
      id: user.id,
    }),
    user,
  });
};
