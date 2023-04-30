const express = require('express');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');

const jsonDoc = path.resolve(__dirname, './talker.json');

const { validaEmail, validaPassword } = require('./middlewares/loginValidations');

const {
  auth,
  validaNome,
  validaIdade,
  validaTalk,
  validaWatchedAt,
  validaDataQuery,
  valiRate,
  validaRateQuery,
  validaPatch,
} = require('./middlewares/talkerValidations');

const readJson = () => fs.readFile(jsonDoc, 'utf8');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// Função de leitura do arquivo .json com módulo fs
const readTalkerFile = async () => {
  try {
    const data = await readJson();
      const result = JSON.parse(data);
      return result;
    } catch (error) {
      console.error(`Erro de leitura de arquivo ${error}`);
    }
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Crie o endpoint GET /talker
app.get('/talker', async (_req, res) => {
  const data = await readTalkerFile();
  
  if (!data) {
    return res.status(200).json([]);
  }
  return res.status(200).json(data);
});

// Crie o endpoint GET /talker/search & q=searchTerm & rate=rateNumber & date=watchedDate
app.get('/talker/search', auth, validaRateQuery, validaDataQuery, async (req, res) => {
  const { q, rate, date } = req.query;
  let data = await readTalkerFile();
  
  if (q) {
    data = data.filter((talk) => talk.name.includes(q));
  }
  if (rate) {
    data = data.filter(({ talk }) => talk.rate === Number(rate)); // alterei para o parametro talk
  }
  if (date) {
    data = data.filter(({ talk }) => talk.watchedAt.includes(date));
  }
  return res.status(200).json(data);
});

// Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const data = await readTalkerFile();
  const speaker = data.find((talker) => talker.id === Number(req.params.id));

  if (speaker) {
    return res.status(200).json(speaker);
  }
  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

// Cria endpoint POST /login
app.post('/login', validaEmail, validaPassword, async (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

// Função para criar novo talker
app.post('/talker',
auth,
validaNome,
validaIdade,
validaTalk,
validaWatchedAt,
valiRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerJson = await readTalkerFile();
  const newTalker = {
    id: talkerJson[talkerJson.length - 1].id + 1,
    name,
    age,
    talk,
  };
  const talkTalker = JSON.stringify([...talkerJson, newTalker]);
  await fs.writeFile(jsonDoc, talkTalker);
  return res.status(201).json(newTalker);
});

// Crie o endpoint PUT /talker/:id - não passava porque esqueci de colocar as validações
app.put('/talker/:id',
auth,
validaNome,
validaIdade,
validaTalk,
validaWatchedAt,
valiRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkerJson = await readTalkerFile();
  const speaker = talkerJson.findIndex((talker) => talker.id === Number(id));
  
  if (speaker === -1) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  talkerJson[speaker] = {
    id: Number(id),
    name,
    age,
    talk: { watchedAt, rate },
  };

  await fs.writeFile(jsonDoc, JSON.stringify(talkerJson, null, 2)); // Zambs ajudou no requisito anterior, usei a mesma forma
    return res.status(200).json(talkerJson[speaker]);
});

// Cria o endpoint DELETE /talker/:id - gabarito course, dia 4.4
app.delete('/talker/:id', auth, async (req, res) => {
  const id = Number(req.params.id);
  const talkerJson = await readTalkerFile();
  const talkerId = talkerJson.find((talker) => talker.id !== id);
  await fs.writeFile(jsonDoc, JSON.stringify(talkerId));
  res.sendStatus(204);
});

// Crie o endpoint PATCH /talker/rate/:id
app.patch('/talker/rate/:id', auth, validaPatch, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const talkerJson = await readTalkerFile();
  const talkerId = talkerJson.find((talker) => talker.id === +id);
  talkerId.talk.rate = rate;
  const talkTalker = JSON.stringify([talkerId]);
  await fs.writeFile(jsonDoc, talkTalker);
  return res.status(204).end();
});
