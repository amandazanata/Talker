// auth
const auth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    next();
};

// Valida nome
const validaNome = (req, res, next) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};

// Valida idade
const validaIdade = (req, res, next) => {
    const { age } = req.body;

    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

    if (Number(age) < 18 || !(Number.isInteger(age))) {
        return res.status(400)
        .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }

    next();
};

const validaTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

    next();
};

// https://temptable.com.br/2015/10/validar-data-no-formato-ddmmaaaa.html
const validaWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    const valiDate = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    if (!valiDate.test(talk.watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }

    next();
};

const validaDataQuery = (req, res, next) => {
    const { date } = req.query;
    const valiDate = /^[0-9]{2}(\/){1}[0-9]{2}(\/){1}[0-9]{4}$/g;

    if (date && !valiDate.test(date)) {
        return res.status(400)
        .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' }); // não passava teste porque não alterei para 'parametro'
    }

    next();
};

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
const valiRate = (req, res, next) => {
    const { rate } = req.body.talk;

    if (rate === undefined) {
        return res.status(400)
        .json({ message: 'O campo "rate" é obrigatório' });
    }

    if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
        return res.status(400)
            .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }

    next();
};

const validaRateQuery = (req, res, next) => {
    const { rate } = req.query;
    const invalid = (!Number.isInteger(Number(rate)) || Number(rate) < 1 || Number(rate) > 5);

    if (invalid && rate !== undefined) {
        return res.status(400)
            .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }

    next();
};

const validaPatch = (req, res, next) => {
    const { rate } = req.body;

    if (rate === undefined) {
        return res.status(400)
        .json({ message: 'O campo "rate" é obrigatório' });
    }
    if ((!Number.isInteger(rate) || Number(rate) < 1 || Number(rate) > 5)) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

module.exports = {
    auth,
    validaNome,
    validaIdade,
    validaTalk,
    validaWatchedAt,
    validaDataQuery,
    valiRate,
    validaRateQuery,
    validaPatch,
};