const jwt = require("jsonwebtoken");

let secretKey = "app____secret";

module.exports = {
  create(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: "12h" });
  },
  verify(token) {
    return jwt.verify(token, secretKey);
  },
};
