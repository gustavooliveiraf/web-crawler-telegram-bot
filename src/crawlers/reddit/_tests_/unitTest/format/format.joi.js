const Joi = require('@hapi/joi');

const formatTemplate = Joi.string().min(1).required();

module.exports = formatTemplate;
