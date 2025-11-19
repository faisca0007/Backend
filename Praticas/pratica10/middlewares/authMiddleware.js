const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'mysecretkey';
const JWT_EXPIRES = '1h';

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Token inválido' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Token inválido' });
    }
    req.usuario = decoded;
    next();
  });
}

function gerarToken(payload) {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  } catch (error) {
    throw new Error('Erro ao gerar o token');
  }
}

function cifrarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);
  return hash;
}

function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}

module.exports = {
  verificarToken,
  gerarToken,
  cifrarSenha,
  compararSenha
};
