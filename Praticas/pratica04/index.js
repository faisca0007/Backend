const express = require('express');

const tarefas = [  
  { id: 1, nome: "Estudar middleware", concluida: false },  
  { id: 2, nome: "Praticar Express", concluida: true }  
];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  next();
});

const router = express.Router();

router.get('/', (req, res) => {
  res.json(tarefas);
});

router.post('/', (req, res) => {
  const { nome, concluida } = req.body;
  
  if (!nome) {
    return res.status(400).json({ error: 'O campo "nome" é obrigatório' });
  }
  
  const novaTarefa = {
    id: tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1,
    nome,
    concluida: concluida || false
  };
  
  tarefas.push(novaTarefa);
  
  res.status(201).json(novaTarefa);
});


router.get('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  
  if (!tarefa) {
    const error = new Error('Tarefa não localizada');
    error.status = 404;
    return next(error);
  }
  
  res.json(tarefa);
});


router.put('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === id);
  
  if (tarefaIndex === -1) {
    const error = new Error('Tarefa não localizada');
    error.status = 404;
    return next(error);
  }
  
  const { nome, concluida } = req.body;
  
  if (nome !== undefined) tarefas[tarefaIndex].nome = nome;
  if (concluida !== undefined) tarefas[tarefaIndex].concluida = concluida;
  
  res.json(tarefas[tarefaIndex]);
});


router.delete('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefaIndex = tarefas.findIndex(t => t.id === id);
  
  if (tarefaIndex === -1) {
    const error = new Error('Tarefa não localizada');
    error.status = 404;
    return next(error);
  }
  
  tarefas.splice(tarefaIndex, 1);
  
  res.status(204).send();
});

app.use('/tarefas', router);

app.use((err, req, res, next) => {
  console.error('Erro:', err.message);
  
  const statusCode = err.status || 400;
  
  res.status(statusCode).json({
    error: err.message
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;