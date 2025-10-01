// controllers/tarefaController.js

// ✅ (a) Importa o model de tarefas
const tarefaModel = require('../models/tarefaModel');

// ✅ (b) Altera a função listar para usar o model
const listar = (req, res) => {
    const resultado = tarefaModel.listar();
    res.json(resultado);
};

// ✅ (g, h) Altera a função buscarPeloId para usar o model
const buscarPeloId = (req, res) => {
    const tarefaId = req.params.tarefaId;
    const resultado = tarefaModel.buscarPeloId(tarefaId);
    
    if (resultado !== null) {
        res.json(resultado);
    } else {
        res.status(404).json({ msg: 'Tarefa não encontrada' });
    }
};

// ✅ (k) Altera a função criar para usar o model
const criar = (req, res) => {
    const resultado = tarefaModel.criar(req.body);
    res.status(201).json(resultado);
};

// ✅ (n, o) Altera a função atualizar para usar o model
const atualizar = (req, res) => {
    const tarefaAtualizada = {
        id: req.params.tarefaId,
        ...req.body
    };
    const resultado = tarefaModel.atualizar(tarefaAtualizada);
    
    if (resultado !== null) {
        res.json(resultado);
    } else {
        res.status(404).json({ msg: 'Tarefa não encontrada' });
    }
};

// ✅ (r, s) Altera a função remover para usar o model
const remover = (req, res) => {
    const tarefaId = req.params.tarefaId;
    const resultado = tarefaModel.remover(tarefaId);
    
    if (resultado !== null) {
        res.status(204).send();
    } else {
        res.status(404).json({ msg: 'Tarefa não encontrada' });
    }
};

// Exporta todas as funções do controller
module.exports = {
    listar,
    buscarPeloId,
    criar,
    atualizar,
    remover
};