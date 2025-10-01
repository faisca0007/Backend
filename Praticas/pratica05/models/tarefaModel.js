// models/tarefaModel.js
const tarefas = []; // Array para armazenar as tarefas

const listar = () => {
    return tarefas;
};

const buscarPeloId = (tarefaId) => {
    return tarefas.find(tarefa => tarefa.id === tarefaId) || null;
};

const criar = (tarefa) => {
    const novaTarefa = {
        id: Math.random().toString(36).substr(2, 4),
        ...tarefa
    };
    tarefas.push(novaTarefa);
    return novaTarefa;
};

const atualizar = (tarefaAtualizada) => {
    const index = tarefas.findIndex(tarefa => tarefa.id === tarefaAtualizada.id);
    if (index === -1) {
        return null;
    }
    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada };
    return tarefas[index];
};

// ✅ Função a ser exportada
const remover = (tarefaId) => {
    const index = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
    if (index === -1) {
        return null;
    }
    const [tarefaRemovida] = tarefas.splice(index, 1);
    return tarefaRemovida;
};

// ✅ Exporta a função 'remover' junto com as outras
module.exports = {
    listar,
    buscarPeloId,
    criar,
    atualizar,
    remover // Certifique-se de que esta linha está presente
};