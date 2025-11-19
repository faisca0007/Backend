const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');
const Usuario = require('../models/usuariosModel');

async function criar(req, res) {
  try {
    const senhaCifrada = cifrarSenha(req.body.senha);
    const novoUsuario = await Usuario.create({ email: req.body.email, senha: senhaCifrada });
    res.status(201).json({ _id: novoUsuario._id, email: novoUsuario.email });
  } catch (error) {
    console.log(error)
    res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
  }
}

async function entrar(req, res) {
  const usuarioEncontrado = await Usuario.findOne({ email: req.body.usuario });
  if (!usuarioEncontrado || !compararSenha(req.body.senha, usuarioEncontrado.senha)) {
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  }
  const token = gerarToken({ email: req.body.usuario });
  res.status(200).json({ token });
}

async function renovar(req, res) {
  const token = gerarToken({ email: req.usuario.email });
  res.status(200).json({ token });
}

async function remover(req, res) {
  await Usuario.findOneAndDelete({ email: req.body.usuario });
  res.status(204).send();
}

module.exports = {
  criar,
  entrar,
  renovar,
  remover
};
