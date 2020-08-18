const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const app = express();
const uuidValidator = require("./middlewares/uuidValidator");

app.use(express.json());
app.use(cors());

const repositories = [];
const likes = 0;

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes };
  
  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", uuidValidator, (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if (repositoryIndex < 0) {
    return response.status(400).json({error: "Repository not found."});
  }

  const repo = repositories[repositoryIndex];
  const repository = { id, title, url, techs, likes: repo.likes };

  repositories[repositoryIndex] = repository;

  return response.status(202).json(repository);
});

app.delete("/repositories/:id", uuidValidator, (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error: "Repository not found."});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", uuidValidator, (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error: "Repository not found."});
  }

  const repository = repositories[repositoryIndex];
 
  repository.likes++;

  repositories[repositoryIndex] = repository;

  return response.status(201).json(repository);
});

module.exports = app;
