const { body } = require('express-validator');
const { validateResult } = require('../lib/validateHelper')


const validategrupos = [
    body('grp_valortotal')
    .exists()
    .withMessage('Error, NO existe'),
   body('grp_valorsaldo')
   .exists()
   .withMessage('Error, NO existe'),
   body('grp_observacion')
   .exists()
   .withMessage('Error, NO existe'),
  
   (req, res, next) => {
    validateResult(req, res, next)
}
]

module.exports = {validategrupos}