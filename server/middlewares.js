const tokenUtils = require("./utils/token");
const { User } = require("./models");

exports.useAuth = async function (req, res, next) {
  let token = req.headers.authorization || '';
  token = token.replace(/bearer/i, "").trim();

  if (!token) {
    res.status(403).send("an auth token is required to access this resource");
    return;
  }

  try {
    let { id } = tokenUtils.verify(token);
    const user = await User.findById(id);
    if (!user) {
      throw Error();
    }
    // pass user along to the next handler
    req.userId = user.id;
    return next();
  } catch (err) {
    res.status(403).send("authorized");
  }
};
