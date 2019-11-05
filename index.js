const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require('./config');

const bot = new TelegramBot(TOKEN, { polling: true });

const crawler = require('./src/crawlers/reddit');

(async () => {
  bot.onText(/\/NadaPraFazer (.*)/, async (msg, match) => {
    try {
      const subreddits = match[1].split(';');

      const res = await Promise.all(subreddits.map(async (subreddit) => crawler(subreddit)));

      bot.sendMessage(msg.chat.id, res.join('')).catch((error) => {
        if (error.response.body.description === 'Bad Request: message is too long') {
          Object.values(res).forEach((elem) => {
            bot.sendMessage(msg.chat.id, elem).catch((error2) => {
              console.log(error2.code);
              console.log(error2.response.body);
              bot.sendMessage(msg.chat.id, 'Erro. Tente novamente mais tarde.');
            });
          });
        } else {
          console.log(error.code);
          console.log(error.response.body);
          bot.sendMessage(msg.chat.id, 'Erro. Tente novamente mais tarde.');
        }
      });
    } catch (err) {
      console.log(err);
      bot.sendMessage(msg.chat.id, 'Erro. Tente novamente mais tarde.');
    }
  });
})();
