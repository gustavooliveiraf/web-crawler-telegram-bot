const $ = require('cheerio');

const format = require('./format');
const constant = require('./utils/constants');

const htmlTree = {
  title: 'div > div > p > a.title',
  score: 'div div.score.unvoted',
  linkThread: 'div > div > p > a',
  linkComment: 'div > div > ul > li a',
};

const sniff = (html) => {
  let flag = false; let
    threadsElem = '';

  $('div .thing', html).each(function () {
    flag = true;
    const score = $(htmlTree.score, this).text();

    if ((score.slice(-1) === 'k' && parseInt(score, 10) >= constant.threadBombandoK)
      || (score.slice(-1) !== 'k' && parseInt(score, 10) >= constant.threadBombando)) {
      const title = $(htmlTree.title, this).text();
      const linkThread = $(htmlTree.linkThread, this).attr('href');
      const linkComment = $(htmlTree.linkComment, this).attr('href');

      const elem = format(title, score, linkThread, linkComment);
      threadsElem = threadsElem.concat(elem);
    }
  });

  return {
    threadsElem,
    flag,
  };
};

module.exports = sniff;
