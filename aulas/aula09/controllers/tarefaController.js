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

function buscar(req, res, next) {
async function buscar(req, res, next) {
  const { id } = req.params;
  const tarefaEncontrada = await Tarefa.findOne({_id: id});
  next();
}

function exibir(req, res) {
  return res.json({});
}

function atualizar(req, res) {
  return res.json({});
async function atualizar(req, res) {
  const { id } = req.params;
  const tarefaAtualizada = await Tarefa.findOneAndUpdate({_id: id}, {...req.body});
  return res.json(tarefaAtualizada);
}

function remover(req, res) {
async function remover(req, res) {
  const { id } = req.params;
  const tarefaRemovida = await Tarefa.findOneAndDelete({_id: id})
  return res.status(204).end();
}