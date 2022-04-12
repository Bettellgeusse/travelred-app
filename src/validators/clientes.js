const { body } = require('express-validator');
const { validateResult } = require('../lib/validateHelper')


const validateCliente = [
    body('cln_nombre')
    .exists()
    .withMessage('Error, NO existe'),
   body('cln_apellido')
   .exists()
   .withMessage('Error, NO existe'),
   body('cln_edad')
   .exists()
   .withMessage('Error, NO existe'),
   body('cln_celular')
   .exists()
   .withMessage('Error, NO existe'),
   body('cln_correo')
   .exists()
   .withMessage('Error, NO existe'),
   body('cln_cedula')
   .exists()
   .withMessage('Error, NO existe'),
   (req, res, next) => {
    validateResult(req, res, next)
}
]

module.exports = {validateCliente}