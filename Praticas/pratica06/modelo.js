const { conectarDb } = require('./database.js');

class Tarefa {
    constructor(nome, concluida = false) {
        this.nome = nome;
        this.concluida = concluida;
        this.id = null;
        this.db = null;
        this.collection = null;
        this.inicializarDb();
    }

    async inicializarDb() {
        this.db = await conectarDb();
        this.collection = this.db.collection('tarefas');
    }

    async inserir() {
        await this.inicializarDb();
        const resultado = await this.collection.insertOne({
            nome: this.nome,
            concluida: this.concluida
        });
        this.id = resultado.insertedId;
        return resultado;
    }

    async alterar() {
        await this.inicializarDb();
        return await this.collection.updateOne(
            { _id: this.id },
            { $set: { nome: this.nome, concluida: this.concluida } }
        );
    }

    async deletar() {
        await this.inicializarDb();
        return await this.collection.deleteOne({ nome: this.nome });
    }

    async buscar() {
        await this.inicializarDb();
        const resultado = await this.collection.findOne({ nome: this.nome });
        if (resultado) {
            this.id = resultado._id;
            this.nome = resultado.nome;
            this.concluida = resultado.concluida;
            return true;
        }
        return false;
    }
}

module.exports = Tarefa;