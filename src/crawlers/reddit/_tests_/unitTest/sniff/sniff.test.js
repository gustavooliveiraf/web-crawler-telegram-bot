const fs = require('fs');
const path = require('path');
const $ = require('cheerio');

const html = $.load(fs.readFileSync(path.resolve(__dirname, '../../mock/subreddits/news/news.html')));
const sniff = require('../../../sniff');
const template = require('./sniff.joi');

describe('unit test', () => {
  describe('reddit', () => {
    describe('Success', () => {
      test('sniff', async () => {
        const checkPayload = sniff(html.html());

        const { error } = template.validate(checkPayload);

        expect(error).toBeUndefined();
      });
    });

    describe('Error', () => {
      test('sniff', async () => {
        const checkPayload = sniff();

        const { error, value } = template.validate(checkPayload);

        expect(error).not.toBeUndefined();
        expect(value.flag).toBeFalsy();
      });
    });
  });
});
