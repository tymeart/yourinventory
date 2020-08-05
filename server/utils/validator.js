const { body, validationResult } = require('express-validator');

const validationRules = () => {
  return [
    body('brand').not().isEmpty().trim()
      .isLength({ min: 3, max: 20 }).withMessage('Brand name must be 3-20 characters long.'),
    body('category').isIn(['Toilet Paper', 'Toothbrush', 'Hand Soap']),
    body('endDate').isDate(),
    body('price').isCurrency(),
    body('quantityNumber').isFloat({ min: 0, max: 1000 }),
    body('quantityUnit').isIn(['unit', 'ounce', 'fluid ounce', 'roll']),
    body('reminderLength').isIn(['1 month', '2 months', '3 months']),
    body('setReminder').isBoolean(),
    body('startDate').isDate()
  ];
}

const validate = (req, res, next) => {
  const errorFormatter = (error) => {
    return `${error.param}: ${error.msg}`;
  };

  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  } else {
    return next();
  }
}

module.exports = { validationRules, validate };