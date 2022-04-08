const { body } = require('express-validator');
const { validateResult } = require('../lib/validateHelper')


const validateCajamayor = [
    body('cja_fecha')
    .exists()
    .withMessage('Error, NO existe'),
   body('cja_Beneficiario')
   .exists()
   .withMessage('Error, NO existe'),
   body('cja_concepto')
   .exists()
   .withMessage('Error, NO existe'),
   body('cja_tipo')
   .exists()
   .withMessage('Error, NO existe'),
   body('cja_valor')
   .exists()
   .withMessage('Error, NO existe'),
   body('cja_estado')
   .exists()
   .withMessage('Error, NO existe'),
   
   (req, res, next) => {
    validateResult(req, res, next)
}
]

module.exports = {validateCajamayor}