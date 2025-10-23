const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

async function criar(req, res) {
  try {
    const novoProduto = await Produto.create({
      nome: req.body.nome,
      preco: req.body.preco
    });
    return res.status(201).json(novoProduto);
  } catch (err) {
    return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function listar(req, res) {
  try {
    const produtosCadastrados = await Produto.find({});
    return res.status(200).json(produtosCadastrados);
  } catch (err) {
    res.status(500).json({ msg: "Erro interno do servidor: " + err.message });
  }
}

async function buscar(req, res, next) {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "Parâmetro inválido" });
    }
    const produtoEncontrado = await Produto.findOne({ _id: id });
    if (!produtoEncontrado) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }
    req.produto = produtoEncontrado;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Erro interno do servidor: " + err.message });
  }
}

async function exibir(req, res) {
  return res.status(200).json(req.produto);
}

async function atualizar(req, res) {
  try {
    const { nome, preco } = req.body;
    if (!nome || !preco) {
      return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: req.params.id },
      { nome, preco },
      { runValidators: true, new: true }
    );
    return res.status(200).json(produtoAtualizado);
  } catch (err) {
    return res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
  }
}

async function remover(req, res) {
  try {
    const produtoRemovido = await Produto.findOneAndDelete({ _id: req.params.id });
    return res.status(204).end();
  } catch (err) {
    res.status(500).json({ msg: "Erro interno do servidor: " + err.message });
  }
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};
