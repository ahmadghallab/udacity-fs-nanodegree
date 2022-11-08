import { body } from "express-validator";

export const signInValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password')
]

export const signUpValidationRules = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('first_name')
    .isString()
    .withMessage('First name is required.'),
  body('last_name')
    .isString()
    .withMessage('Last name is required.'),
  body('password').trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
]

export const createProductValidationRules = [
  body('name')
    .isString()
    .withMessage('Product name is required.'),
  body('price')
    .isNumeric()
    .withMessage('Product price is required.')
]

export const createOrderValidationRules = [
  body('product_id')
    .isNumeric()
    .withMessage('Product id is required.'),
  body('quantity')
  .isNumeric()
  .withMessage('Product quantity is required.')
]