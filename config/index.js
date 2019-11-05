require('dotenv').config();

module.exports = {
  TOKEN: process.env.TOKEN,
  urlBaseReddit: process.env.URL_BASE_REDDIT,
  urlApiReddit: process.env.URL_API_REDDIT,
};
