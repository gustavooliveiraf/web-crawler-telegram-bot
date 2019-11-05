const format = require('../../../format');
const template = require('./format.joi');

const payload = {
  title: Math.random().toString(36).substring(7),
  score: Math.random().toString(36).substring(7),
  linkThread: Math.random().toString(36).substring(7),
  linkComment: Math.random().toString(36).substring(7),
};

describe('unit test', () => {
  describe('reddit', () => {
    describe('Success', () => {
      test('format', async () => {
        const checkPayload = format(payload.title, payload.score, payload.linkThread,
          payload.linkComment);

        const { error } = template.validate(checkPayload);

        expect(error).toBeUndefined();
      });
    });

    describe('Error', () => {
      test('format', async () => {
        const checkPayload = format();

        const { error } = template.validate(checkPayload);

        expect(error).not.toBeUndefined();
      });
    });
  });
});
