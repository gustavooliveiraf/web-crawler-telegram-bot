const request = require('request-promise');
const $ = require('cheerio');

const sniff = require('./sniff');

const { urlBaseReddit, urlApiReddit } = require('../../../config');
const { breakLine } = require('./utils/staticTexts');
const text = require('./utils/dynamicTexts');

const crawler = async (subreddit) => {
  try {
    const url = urlBaseReddit + urlApiReddit.replace('subreddit', subreddit);
    const html = await request(url);

    const { threadsElem, flag } = sniff(html);

    if (threadsElem) {
      const title = text.subredditExistsAndBombando(subreddit);
      return title.concat(threadsElem.concat(breakLine));
    } if (flag) {
      return text.subredditExistsButIsNotBombando(subreddit);
    }
    if ($('#noresults', html).text() === 'there doesn\'t seem to be anything here') {
      return text.subredditNotExistStatusCode200(subreddit);
    }
    return text.subredditNotExistOrIsPrivate(subreddit);
  } catch (err) {
    if (err.statusCode === 403) {
      return text.subredditIsPrivate(subreddit);
    } if (err.statusCode === 404) {
      return text.subredditNotExistStatusCode404(subreddit);
    }
    return text.subredditNotExistOrIsPrivate(subreddit);
  }
};

module.exports = crawler;
