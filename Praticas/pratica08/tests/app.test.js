const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('Testes da API REST', () => {
  let token;
  let newToken;
  let server;

  beforeAll(async () => {
    server = app.listen(0); // Use port 0 to get a random available port
  });

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('GET /produtos sem token deve retornar 401 e mensagem "Não autorizado"', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Não autorizado');
  });

  test('GET /produtos com token inválido deve retornar 401 e mensagem "Token inválido"', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', '123456789');
    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body.msg).toBe('Token inválido');
  });

  test('POST /usuarios/login com credenciais válidas deve retornar 200 e token', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  test('GET /produtos com token válido deve retornar 200 e JSON', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  test('POST /usuarios/renovar com token válido deve retornar 200 e novo token', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');
    newToken = response.body.token;
  });

  test('GET /produtos com novo token deve retornar 200 e JSON', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', newToken);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
});
