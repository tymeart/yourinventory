const { body, validationResult } = require('express-validator');

const validationRules = () => {
  return [
    body('category').isIn(['Toilet Paper', 'Toothbrush', 'Hand Soap']),
    body('brand').not().isEmpty().trim(),
    body('startDate').isDate(),
    body('endDate').isDate(),
    body('price').isFloat(),
    body('quantityNumber').isFloat(),
    body('quantityUnit').isIn(['unit', 'ounce', 'fluid ounce', 'roll']),
    body('setReminder').isBoolean(),
    body('reminderLength').isIn(['1 month', '2 months', '3 months'])
  ];
}

const validate = (req, res, next) => {
  const errorFormatter = (error) => {
    return `${error.param}: ${error.msg}`;
  };

  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    return next();
  }
}

module.exports = { validationRules, validate };