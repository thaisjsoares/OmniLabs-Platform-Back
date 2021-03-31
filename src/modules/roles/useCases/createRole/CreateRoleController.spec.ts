import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm/index';

let connection: Connection;

describe('Create Role Controller', async () => {
    beforeEach(async () => {
        connection = await createConnection();

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
    it('shoud be able to create a new role', async () => {
        const response = await request(app).post('/roles').send({
            name: 'Admin',
        });

        expect(response.status).toBe(200);
    });
});
