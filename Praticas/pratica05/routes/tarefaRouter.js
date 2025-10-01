const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');

// Rota para listar todas as tarefas (GET /)
router.get('/', tarefaController.listar);

// Rota para buscar uma tarefa específica (GET /:tarefaId)
router.get('/:tarefaId', tarefaController.buscarPeloId);

// Rota para criar uma nova tarefa (POST /)
router.post('/', tarefaController.criar);

// Rota para atualizar uma tarefa existente (PUT /:tarefaId)
router.put('/:tarefaId', tarefaController.atualizar);

// Rota para excluir uma tarefa (DELETE /:tarefaId)
router.delete('/:tarefaId', tarefaController.remover);

module.exports = router;