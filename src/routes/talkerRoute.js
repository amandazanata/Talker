const express = require('express');
// const utilsFunction = require('../utils');
const talkers = require('../talker.json');

const route = express.Router();

route.get('/', async (_req, res) => {
  // const array = [];
  const array = talkers.splice(0);
  if (!talkers) {
    return res.status(200).json(talkers);
}
  return res.status(200).json(array);
});

route.get('/:id', async (req, res) => {
  // const talkers = await readFile();
  const speaker = talkers.find((talker) => talker.id === Number(req.params.id));
    
    if (speaker) {
      return res.status(200).json(speaker);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  });

module.exports = route;