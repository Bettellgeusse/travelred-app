const { body } = require('express-validator');
const { validateResult } = require('../lib/validateHelper')


const validateahorro = [
    body('aho_acom')
    .exists()
    .withMessage('Error, NO existe'),
   body('aho_extra')
   .exists()
   .withMessage('Error, NO existe'),
   body('aho_abono1')
   .exists()
   .withMessage('Error, NO existe'),
   body('aho_abono2')
   .exists()
   .withMessage('Error, NO existe'),
   body('aho_abono3')
   .exists()
   .withMessage('Error, NO existe'),
   body('aho_fecha_abono1')
   .exists()
   .withMessage('Error, NO existe'),
   body('aho_fecha_abono2')
   .exists()
   .withMessage('Error, NO existe'),
   body('aho_fecha_abono3')
   .exists()
   .withMessage('Error, NO existe'),

   (req, res, next) => {
    validateResult(req, res, next)
}
]

module.exports = {validateahorro}