const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  sEmail: process.env.server_email,
  sPass: process.env.server_pass
};