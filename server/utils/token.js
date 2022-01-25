const jwt = require("jsonwebtoken");

let secretKey = process.env.JWT_SECRET_KEY

module.exports = {
  create(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: "12h" });
  },
  verify(token) {
    return jwt.verify(token, secretKey);
  },
};
