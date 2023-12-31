const joi = require("joi");

const userValidate = joi.object({
  email: joi.string().trim().required().email().messages({
    "string.base": `Email must be a string`,
    "string.empty": `Email cannot be empty`,
    "string.email": `Email must be a valid email address`,
    "any.required": `Email is required`,
  }),
  password: joi.string().trim().required().min(8).max(255).messages({
    "string.base": `password must be a string`,
    "string.empty": `password cannot be empty`,
    "string.min": `password should have a minimum length of {#limit}`,
    "string.max": `password should have a maximum length of {#limit}`,
    "any.required": `password is required`,
  }),
  name: joi.string().trim().required().min(8).max(255).messages({
    "string.base": `Name must be a string`,
    "string.empty": `Name cannot be empty`,
    "string.min": `Name should have a minimum length of {#limit}`,
    "string.max": `Name should have a maximum length of {#limit}`,
    "any.required": `Name is required`,
  }),
  userType: joi.string().valid("admin", "user").required().messages({
    "string.base": `userType must be a string`,
    "string.empty": `userType cannot be empty`,
    "string.valid": `type must be Admin or User`,
    "any.required": `userType is required`,
  }),
});

module.exports = userValidate;
