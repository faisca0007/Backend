const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let id = null;

describe('Testes do recurso /produtos', () => {
  test('POST /produtos com JSON válido deve retornar 201 e JSON com _id, nome e preco', async () => {
    const response = await request.post('/produtos').send({ nome: 'Laranja', preco: 10.0 });
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);
    id = response.body._id;
  });

  test('POST /produtos sem JSON deve retornar 422 e msg "Nome e preço do produto são obrigatórios"', async () => {
    const response = await request.post('/produtos').send({});
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos deve retornar 200 e array de objetos', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /produtos/:id deve retornar 200 e JSON com _id, nome e preco', async () => {
    const response = await request.get(`/produtos/${id}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);
  });

  test('GET /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await request.get('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('GET /produtos/00000000000000000000000 deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await request.get('/produtos/00000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  test('PUT /produtos/:id com JSON válido deve retornar 200 e JSON atualizado', async () => {
    const response = await request.put(`/produtos/${id}`).send({ nome: 'Laranja Pera', preco: 18.00 });
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja Pera');
    expect(response.body.preco).toBe(18.00);
  });

  test('PUT /produtos/:id sem JSON deve retornar 422 e msg "Nome e preço do produto são obrigatórios"', async () => {
    const response = await request.put(`/produtos/${id}`).send({});
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  test('PUT /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await request.put('/produtos/0').send({ nome: 'Teste', preco: 1.0 });
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('PUT /produtos/00000000000000000000000 deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await request.put('/produtos/00000000000000000000000').send({ nome: 'Teste', preco: 1.0 });
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Produto não encontrado');
  });

  test('DELETE /produtos/:id deve retornar 204 e sem conteúdo', async () => {
    const response = await request.delete(`/produtos/${id}`);
    expect(response.status).toBe(204);
    expect(response.text).toBe('');
  });

  test('DELETE /produtos/0 deve retornar 400 e msg "Parâmetro inválido"', async () => {
    const response = await request.delete('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  test('DELETE /produtos/:id deve retornar 404 e msg "Produto não encontrado"', async () => {
    const response = await request.delete(`/produtos/${id}`);
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Produto não encontrado');
  });
});
