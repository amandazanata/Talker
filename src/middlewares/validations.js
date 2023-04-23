// const validator = require('validator');

// VALIDAÇÃO DO CAMPO EMAIL
const validaEmail = (req, _res, next) => {
    const getBody = req.body;

    const property = ['email'];

    if (!(property in getBody)) {
        return next({ message: 'O campo "email" é obrigatório', statusCode: 400 });
    }
    return next();
};

// VALIDAÇÃO DO FORMATO DO EMAIL
const validaCorpoEmail = (req, _res, next) => {
    const { email } = req.body;

    const emailProperty = email.includes('@');
    // validator.isEmail(email);

    if (emailProperty !== email) {
        return next({ message: 'O "email" deve ter o formato "email@email.com"', statusCode: 400 });
    }
    return next();
};

// VALIDAÇÃO DO CAMPO PASSWORD
const validaPassword = (req, _res, next) => {
    const getBody = req.body;

    const property = ['password'];

    if (!(property in getBody)) {
        return next({ message: 'O campo "password" é obrigatório', statusCode: 400 });
    }
    return next();
};

// VALIDAÇÃO DE CARACTERES DO PASSWORD
const validaCaracPassword = (req, _res, next) => {
    const { password } = req.body;

    const passwordProperty = password >= 6;

    if (!passwordProperty) {
        return next({ message: 'O "password" deve ter pelo menos 6 caracteres', statusCode: 400 });
    }
    return next();
};

module.exports = {
    validaEmail,
    validaCorpoEmail,
    validaPassword,
    validaCaracPassword,
};