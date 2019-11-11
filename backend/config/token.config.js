const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  sKey: process.env.secret_key
};