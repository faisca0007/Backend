// tests/app.test.js

// Importa o supertest e a instância do app Express
const request = require('supertest');
const app = require('../app'); // Ajuste o caminho se necessário

// Variável para guardar o ID da tarefa criada nos testes
let idTarefaCriada;

// Testes para o endpoint GET /tarefas
describe('GET /tarefas', () => {
    it('deve retornar status 200 e conteúdo JSON', async () => {
        const resposta = await request(app)
            .get('/tarefas')
            .expect(200)
            .expect('Content-Type', /json/);
    });
});

// Testes para o endpoint POST /tarefas
describe('POST /tarefas', () => {
    it('deve retornar status 201, conteúdo JSON e salvar o ID', async () => {
        const novaTarefa = { "nome": "Estudar Node", "concluida": false };
        
        const resposta = await request(app)
            .post('/tarefas')
            .send(novaTarefa) // Envia o corpo da requisição como JSON
            .expect(201)
            .expect('Content-Type', /json/);

        // Salva o ID retornado para usar nos próximos testes
        idTarefaCriada = resposta.body.id;
    });
});

// Testes para o endpoint GET /tarefas/:id
describe('GET /tarefas/:id', () => {
    it('deve retornar status 200 e JSON para um ID existente', async () => {
        const resposta = await request(app)
            .get(`/tarefas/${idTarefaCriada}`) // Usa o ID salvo
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('deve retornar status 404 para um ID inexistente', async () => {
        await request(app)
            .get('/tarefas/1') // ID que não existe
            .expect(404)
            .expect('Content-Type', /json/);
    });
});

// Testes para o endpoint PUT /tarefas/:id
describe('PUT /tarefas/:id', () => {
    it('deve retornar status 200 e JSON ao atualizar uma tarefa', async () => {
        const tarefaAtualizada = { "nome": "Estudar Node e Express", "concluida": true };
        
        await request(app)
            .put(`/tarefas/${idTarefaCriada}`) // Usa o ID salvo
            .send(tarefaAtualizada)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('deve retornar status 404 ao tentar atualizar um ID inexistente', async () => {
        const tarefaAtualizada = { "nome": "Tarefa Inexistente", "concluida": true };
        
        await request(app)
            .put('/tarefas/1') // ID que não existe
            .send(tarefaAtualizada)
            .expect(404)
            .expect('Content-Type', /json/);
    });
});

// Testes para o endpoint DELETE /tarefas/:id
describe('DELETE /tarefas/:id', () => {
    it('deve retornar status 204 e sem conteúdo para um ID existente', async () => {
        await request(app)
            .delete(`/tarefas/${idTarefaCriada}`) // Usa o ID salvo
            .expect(204)
            .then(resposta => {
                // Verifica se o corpo da resposta está vazio
                if (resposta.body && Object.keys(resposta.body).length !== 0) {
                    throw new Error('Resposta deveria estar vazia');
                }
            });
    });

    it('deve retornar status 404 para um ID inexistente', async () => {
        await request(app)
            .delete('/tarefas/1') // ID que não existe
            .expect(404)
            .expect('Content-Type', /json/);
    });
});