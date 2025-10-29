const jwt = require("jsonwebtoken");

function verificarToken(req, res, next)  {

}

function gerarToken(payload){
try{
    const token = jwt.signc(payload, process.env.
        JWT_SEGREDO);
        return token;
   } catch(err)  {
        throw Error("Erro ao gerar token");
    }
}


module.exports = {verificarToken, gerarToken}