const express = require('express');
const { readTalkerFile } = require('../utils');

const route = express.Router();

// Crie o endpoint GET /talker
route.get('/', async (_req, res) => {
  const data = await readTalkerFile();
  const array = data.splice(0);

  if (!data) {
    return res.status(200).json(data);
  }
  return res.status(200).json(array);
});

// Crie o endpoint GET /talker/:id
route.get('/:id', async (req, res) => {
  const data = await readTalkerFile();
  const speaker = data.find((talker) => talker.id === Number(req.params.id));

  if (!speaker) {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(speaker);
});

// requisito 5

// requisito 6 e 7

// requisito 8

module.exports = route;