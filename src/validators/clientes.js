const { body } = require('express-validator');
const { validateResult } = require('../lib/validateHelper')


const validateCliente = [
    body('cln_nombre')
    .exists()
    .withMessage('Error, nombre NO existe')
    .not()
    .isEmpty()
    .withMessage('Error, Escriba el Nombre'),
   body('cln_apellido')
    .exists()
    .withMessage('Error, Apellido NO existe')
    .not()
    .isEmpty()
    .withMessage('Error, Escriba el Apellido'),
   body('cln_edad')
    .exists()
    .withMessage('Error, Edad NO existe')
    .not()
    .isEmpty()
    .withMessage('Error, escriba la Edad')
    .isNumeric()
    .withMessage('Error, escriba un numero'),
   body('cln_celular')
   .exists()
   .withMessage('Error, Celular NO existe')
   .not()
   .isEmpty()
   .withMessage('Error, escriba un Numero Celular')
   .isNumeric()
   .withMessage('Error, escriba un numero'),
   body('cln_correo')
   .exists()
   .withMessage('Error, Correo NO existe')
   .not()
   .isEmpty()
   .withMessage('Error, digite un Correo ')
   .isEmail()
   .withMessage('Error, escriba una direccion de correo valida '),
   body('cln_cedula')
   .exists()
   .withMessage('Error, Cedula NO existe')
   .not()
   .isEmpty()
   .withMessage('Error, digigite su Numero de cedula'),
   (req, res, next) => {
    validateResult(req, res, next)
}
]

module.exports = {validateCliente}