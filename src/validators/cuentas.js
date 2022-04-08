const { body } = require('express-validator');
const { validateResult } = require('../lib/validateHelper')


const validateCuentas = [
    body('cta_banco')
    .exists()
    .withMessage('Error, NO existe'),
   body('cta_numerocuenta')
   .exists()
   .withMessage('Error, NO existe'),
   body('cta_nombre')
   .exists()
   .withMessage('Error, NO existe'),
   
   (req, res, next) => {
    validateResult(req, res, next)
}
]

module.exports = {validateCuentas}