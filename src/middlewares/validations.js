const validaEmail = (req, res, next) => {
    const fields = ['email', 'password'];

    if (fields.every((property) => property in req.body));

    next();
};

module.exports = {
    validaEmail,
};