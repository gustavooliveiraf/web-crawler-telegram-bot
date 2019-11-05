const Joi = require('@hapi/joi');

const sniffTemplate = Joi.object().keys({
  threadsElem: Joi.string().min(1).required(),
  flag: Joi.boolean().required(),
});

module.exports = sniffTemplate;
