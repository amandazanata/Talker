const express = require('express');
const { readTalkerFile } = require('../fsUtils');

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

  if (speaker) {
    return res.status(200).json(speaker);
  }
  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

// requisito 5 - Crie o endpoint POST /talker
/* route.post('/', async (req, res) => {
  const addTalker = req.body;

}); */

/*
***exemplo aula backend 4.4***

route.post('/', fieldValidation, valuesValidation, async (req, res) => {
  const blogPost = req.body;

  const id = (await utilsFile.getBlogPostLastId()) + 1;

  const blogPostWithDate = {
    id,
    ...blogPost,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await utilsFile.insertBlogPostFile(blogPostWithDate);

  return res.status(201).json(blogPostWithDate);
}); 

***exemplo aula 4.5***

simpsonsRoute.post('/', async (req, res) => {
  const simpson = req.body;
  const result = await simpsonsDb.createSimpson(simpson);
  return res.status(201).json(result);
});
*/

// requisito 6 e 7

// requisito 8

module.exports = route;