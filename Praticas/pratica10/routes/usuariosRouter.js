const express = require('express');
const { verificarToken } = require('../middlewares/authMiddleware');
const { criar, entrar, renovar, remover } = require('../controllers/usuariosController');

const router = express.Router();

router.post('/', criar);
router.post('/login', entrar);
router.post('/renovar', verificarToken, renovar);
router.delete('/', verificarToken, remover);

module.exports = router;
