const express = require('express');
const crypto = require('crypto');

const talkerRoute = require('./routes/talker.routes');
const {
  valida,
  validaEmail,
  validaPassword,
} = require('./middlewares/validations');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.use('/talker', talkerRoute);

// Cria endpoint POST /login, gera o token aleatório
app.post('/login',
valida,
validaEmail,
validaPassword,
async (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
console.log('Online');
});