const express = require('express');
const talkers = require('../talker.json');

const route = express.Router();

// Crie o endpoint GET /talker
route.get('/', async (_req, res) => {
  // const array = [];
  const array = talkers.splice(0);
  if (!talkers) {
    return res.status(200).json(talkers);
}
  return res.status(200).json(array);
});

// Crie o endpoint GET /talker/:id
route.get('/:id', async (req, res) => {
  const speaker = talkers.find((talker) => talker.id === Number(req.params.id));
    
  if (!speaker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(speaker);
});

// requisito 5

// requisito 6 e 7

// requisito 8

module.exports = route;