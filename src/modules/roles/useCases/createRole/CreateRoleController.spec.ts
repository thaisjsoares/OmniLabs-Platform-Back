import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm/index';

let connection: Connection;

describe('Create Role Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id = uuid();

        const password = await hash('admin', 8);

        await connection.query(
            `INSERT INTO ROLES(id, name, created_at, updated_at)
                values('acbdc058-fbe8-45b2-9b9e-9f65c35a6987','Admin', 'now()', 'now()' )
            `,
        );

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, created_at, updated_at)
                values('8e3b0d9d-925e-4be1-b440-e4ccb41f8657','admin', 'admin@omnilabs.com.br', '${password}', 'now()', 'now()' )
            `,
        );

        await connection.query(
            `INSERT INTO users_roles(id, user_id, created_at, updated_at, role_id )
                values('${id}','8e3b0d9d-925e-4be1-b440-e4ccb41f8657', 'now()', 'now()', 'acbdc058-fbe8-45b2-9b9e-9f65c35a6987')
            `,
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.close();
    });
    it('shoud be able to create a new role', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@omnilabs.com.br',
            password: 'admin',
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/roles')
            .send({
                name: 'role-teste',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });

    it('should not be able to create role if name of role already exists', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@omnilabs.com.br',
            password: 'admin',
        });

        const { token } = responseToken.body;

        const response = await request(app)
            .post('/roles')
            .send({
                name: 'role-teste',
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(400);
    });
});
