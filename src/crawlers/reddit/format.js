const message = require('./utils/staticTexts');

const format = (title, score, linkThread, linkComment) => {
  if (title || score || linkThread || linkComment) {
    return `\
${message.title}${title}
${message.score}${score}
${message.linkThread}${linkThread}
${message.linkComment}${linkComment}
~
`;
  }
  return '';
};

module.exports = format;
