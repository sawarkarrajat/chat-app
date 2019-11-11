const { sKey } = require("../config/token.config");
const jwt = require('jsonwebtoken');
module.exports = {
  tokenGenerator(body) {
    let payload = { id: body.id };
    return jwt.sign({ payload }, sKey);
  }
}