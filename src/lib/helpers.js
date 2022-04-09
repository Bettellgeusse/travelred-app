const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;   
};

helpers.matchPassword = async (password, savedPassword) => {
   try {
    return await bcrypt.compareSync(password, savedPassword);
   } catch (e) {
       console.log('no deberia entrar aqui')
       console.log(e);
   }
};

module.exports = helpers;