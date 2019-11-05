const nock = require('nock');
const fs = require('fs');
const path = require('path');
const $ = require('cheerio');

const text = require('../../utils/dynamicTexts');
const { urlBaseReddit, urlApiReddit } = require('../../../../../config');
const crawler = require('../../index');

const payloadCheckout = require('../mock/subreddits/news/news.out');

describe('integration', () => {
  describe('reddit', () => {
    describe('Subreddit exists and is bombando', () => {
      test('index', async () => {
        const subreddit = 'news';

        const html = $.load(fs.readFileSync(path.resolve(__dirname, `../mock/subreddits/news/${subreddit}.html`)));
        const api = urlApiReddit.replace('subreddit', subreddit);
        nock(urlBaseReddit)
          .get(api)
          .reply(200, html.html());

        const checkPayload = await crawler(subreddit);

        expect(checkPayload === payloadCheckout).toBe(true);
      });
    });

    describe('Subreddit exists but is not bombando', () => {
      test('index', async () => {
        const subreddit = 'brazil';

        const html = $.load(fs.readFileSync(path.resolve(__dirname, `../mock/subreddits/${subreddit}.html`)));
        const api = urlApiReddit.replace('subreddit', subreddit);
        nock(urlBaseReddit)
          .get(api)
          .reply(200, html.html().substring(0, html.html().length / 2));

        const checkPayload = await crawler(subreddit);

        expect(checkPayload === text.subredditExistsButIsNotBombando(subreddit)).toBe(true);
      });
    });

    describe('Subreddit is private', () => {
      test('index', async () => {
        const subreddit = 'asas';

        const api = urlApiReddit.replace('subreddit', subreddit);
        nock(urlBaseReddit)
          .get(api)
          .reply(403);

        const checkPayload = await crawler(subreddit);

        expect(checkPayload === text.subredditIsPrivate(subreddit)).toBe(true);
      });
    });

    describe('Subreddit does not exist Status Code 200', () => {
      test('index', async () => {
        const subreddit = 'newsasasasasaasasas';

        const html = $.load(fs.readFileSync(path.resolve(__dirname, `../mock/subreddits/${subreddit}.html`)));
        const api = urlApiReddit.replace('subreddit', subreddit);
        nock(urlBaseReddit)
          .get(api)
          .reply(200, html.html().substring(0, html.html().length / 2));

        const checkPayload = await crawler(subreddit);

        expect(checkPayload === text.subredditNotExistStatusCode200(subreddit)).toBe(true);
      });
    });

    describe('Subreddit does not exist Status Code 404', () => {
      test('index', async () => {
        const subreddit = 'a';

        const api = urlApiReddit.replace('subreddit', subreddit);
        nock(urlBaseReddit)
          .get(api)
          .reply(404);

        const checkPayload = await crawler(subreddit);

        expect(checkPayload === text.subredditNotExistStatusCode404(subreddit)).toBe(true);
      });
    });

    describe('Subreddit does not exist Status or is private status code 2xx', () => {
      test('index', async () => {
        const subreddit = 'a';

        const api = urlApiReddit.replace('subreddit', subreddit);
        nock(urlBaseReddit)
          .get(api)
          .reply(200, '<h2>Random</h2>');

        const checkPayload = await crawler(subreddit);

        expect(checkPayload === text.subredditNotExistOrIsPrivate(subreddit)).toBe(true);
      });
    });

    describe('Subreddit does not exist Status or is private status code other than 2xx', () => {
      test('index', async () => {
        const subreddit = 'random';

        const api = urlApiReddit.replace('subreddit', subreddit);
        nock(urlBaseReddit)
          .get(api)
          .reply(400);

        const checkPayload = await crawler(subreddit);

        expect(checkPayload === text.subredditNotExistOrIsPrivate(subreddit)).toBe(true);
      });
    });
  });
});
