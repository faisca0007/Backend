function listar(req, res) {
  return res.json({});
const Tarefa = require("../models/tarefaModel");

async function listar(req, res) {
  try {
    const tarefas = await Tarefa.find({});
    return res.json(tarefas);
  } catch (err) {
    res.status(500).json({ msg: "Deu ruim:" + err.message });
  }
}

function criar(req, res) {
  return res.status(201).json({});
async function criar(req, res) {
  const novaTarefa = await Tarefa.create({
    nome: req.body.nome,
    concluida: false,
  });
  return res.status(201).json(novaTarefa);
}

function buscar(req, res, next)  {
    const {id} = req.params;
    next();
}

function exibir(req, res) {
  return res.json({});
}

function atualizar (req, res) {
    return res.json({});
}

function remover(req, res) {
    return res.status(204).end();
}