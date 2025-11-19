const request = require('supertest');
const app = require('../app');

let userId;
let token;

describe('/usuarios', () => {
  it('POST /usuarios with valid data should return 201 and user data', async () => {
    const response = await request(app)
      .post('/usuarios')
      .send({ email: 'usuario@email.com', senha: 'abcd1234' })
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe('usuario@email.com');
    userId = response.body._id;
  });

  it('POST /usuarios without body should return 422', async () => {
    const response = await request(app)
      .post('/usuarios')
      .expect(422);

    expect(response.body.msg).toBe('Email e Senha são obrigatórios');
  });

  it('POST /usuarios/login with valid credentials should return 200 and token', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({ usuario: 'usuario@email.com', senha: 'abcd1234' })
      .expect(200);

    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('POST /usuarios/login without body should return 401', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .expect(401);

    expect(response.body.msg).toBe('Credenciais inválidas');
  });

  it('POST /usuarios/renovar with valid token should return 200 and new token', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('token');
  });

  it('POST /usuarios/renovar with invalid token should return 401', async () => {
    const response = await request(app)
      .post('/usuarios/renovar')
      .set('authorization', 'Bearer 123456789')
      .expect(401);

    expect(response.body.msg).toBe('Token inválido');
  });

  it('DELETE /usuarios with valid token should return 204', async () => {
    const response = await request(app)
      .delete('/usuarios')
      .set('authorization', `Bearer ${token}`)
      .send({ usuario: 'usuario@email.com' })
      .expect(204);
  });
});
