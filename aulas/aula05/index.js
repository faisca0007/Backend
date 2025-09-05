// importa o frameweork
const express =require('express');

// cria uma instancia da aplicação
const app = express();

//middleware de aplicação
app.use((req, res, next) => {
console.log("Passei aqui");
next();

})


// inicia a aplicação
app.listen(3000, ()=>{
    console.log("App está ON!");
});

//middleware de rota
const router =express.Router();

router.get('/', (req, res) => {
  res.send("Chegou aqui");
});

router.post('/',(req, res) =>{
    res.status(201).send("Inserido com sucesso");
});

router.get("/:id", (req, res) => {
    const{ id } = req.params; // {id: 1, param2: 5, param3: 6}
    if (id == 1) return res.send("Achei");
    res.status(404).send("Não achei");
}); 


app.use('/tarefas', router);

