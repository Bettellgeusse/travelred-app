const { body } = require("express-validator");
const { validateResult } = require("../lib/validateHelper");

const validatereservas = [
  body("res_cuen")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_acom")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_extra")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_abono1")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_abono2")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_abono3")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_observaciones")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_fecha_abono1")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_fecha_abono2")
  .exists()
  .withMessage("Error, NO existe"),
  body("res_fecha_abono3")
  .exists()
  .withMessage("Error, NO existe"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatereservas };
