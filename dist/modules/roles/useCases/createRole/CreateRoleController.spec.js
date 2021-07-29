"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('Create Role Controller', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)('admin', 8);
    await connection.query(`INSERT INTO ROLES(id, name, created_at, updated_at)
                values('acbdc058-fbe8-45b2-9b9e-9f65c35a6987','Admin', 'now()', 'now()' )
            `);
    await connection.query(`INSERT INTO USERS(id, name, email, password, created_at, updated_at)
                values('8e3b0d9d-925e-4be1-b440-e4ccb41f8657','admin', 'admin@omnilabs.com.br', '${password}', 'now()', 'now()' )
            `);
    await connection.query(`INSERT INTO users_roles(id, user_id, created_at, updated_at, role_id )
                values('${id}','8e3b0d9d-925e-4be1-b440-e4ccb41f8657', 'now()', 'now()', 'acbdc058-fbe8-45b2-9b9e-9f65c35a6987')
            `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('shoud be able to create a new role', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@omnilabs.com.br',
      password: 'admin'
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post('/roles').send({
      name: 'role-teste'
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(201);
  });
  it('should not be able to create role if name of role already exists', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@omnilabs.com.br',
      password: 'admin'
    });
    const {
      token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post('/roles').send({
      name: 'role-teste'
    }).set({
      Authorization: `Bearer ${token}`
    });
    expect(response.status).toBe(400);
  });
});