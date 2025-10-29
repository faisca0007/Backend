const express = require('express');
const router = express.Router();

router.post("/login", (req, res)  => {
   const { username, password } = req.body;

   if(username === "jose@iesb.br" &&
    password === "abcd1234)") {

    }
})

module.exports = router;
