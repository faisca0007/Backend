const Tarefa = require('./modelo.js');

async function adicionarTarefa(nome) {
    const tarefa = new Tarefa(nome);
    await tarefa.inserir();
    console.log(`Tarefa "${nome}" adicionada com sucesso!`);
}

async function buscarTarefa(nome) {
    const tarefa = new Tarefa(nome);
    const encontrada = await tarefa.buscar();
    if (encontrada) {
        console.log(`Tarefa encontrada: ${tarefa.nome} - Concluída: ${tarefa.concluida}`);
        return tarefa;
    } else {
        console.log(`Tarefa "${nome}" não encontrada.`);
        return null;
    }
}

async function atualizarTarefa(nome, concluida) {
    const tarefa = new Tarefa(nome);
    const encontrada = await tarefa.buscar();
    if (encontrada) {
        tarefa.concluida = concluida === 'true' || concluida === '1';
        await tarefa.alterar();
        console.log(`Tarefa "${nome}" atualizada com sucesso!`);
    } else {
        console.log(`Tarefa "${nome}" não encontrada para atualização.`);
    }
}

async function removerTarefa(nome) {
    const tarefa = new Tarefa(nome);
    const encontrada = await tarefa.buscar();
    if (encontrada) {
        await tarefa.deletar();
        console.log(`Tarefa "${nome}" removida com sucesso!`);
    } else {
        console.log(`Tarefa "${nome}" não encontrada para remoção.`);
    }
}

module.exports = {
    adicionarTarefa,
    buscarTarefa,
    atualizarTarefa,
    removerTarefa
};