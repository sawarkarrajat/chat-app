var bcrypt = require("bcryptjs");

module.exports = {
  /**
   *
   * @param {String} password this method is used to encrypt password
   */
  encryptPass(password) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  }
};
