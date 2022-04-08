const { body } = require("express-validator");
const { validateResult } = require("../lib/validateHelper");

const validateTours = [
  body("tou_nombre")
  .exists()
  .withMessage("Error, NO existe"),
  body("tou_tipo")
  .exists()
  .withMessage("Error, NO existe"),
  body("tou_valorneto")
  .exists()
  .withMessage("Error, NO existe"),
  body("tou_valorcomisionable")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_atou_observacionesbono3")
  .exists()
  .withMessage("Error, NO existe"),
  body("tou_fecha")
  .exists()
  .withMessage("Error, NO existe"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateTours };
