const { breakLine } = require('./staticTexts');

module.exports = {
  subredditExistsAndBombando: (subreddit) => `--- Subreddit: ${subreddit} ---\n`,
  subredditExistsButIsNotBombando: (subreddit) => `Subreddit "${subreddit}" não tem threads que estão bombando nesse momento!\n\
${breakLine}`,
  subredditNotExistStatusCode200: (subreddit) => `Subreddit "${subreddit}" não existe.\n${breakLine}`,
  subredditIsPrivate: (subreddit) => `Subreddit "${subreddit}" é privado.\n${breakLine}`,
  subredditNotExistStatusCode404: (subreddit) => `Subreddit "${subreddit}" é privado.\n${breakLine}`,
  subredditNotExistOrIsPrivate: (subreddit) => `Subreddit "${subreddit}" não existe ou é privado.\n${breakLine}`,
};
