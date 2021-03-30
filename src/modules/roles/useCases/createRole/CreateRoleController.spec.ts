import request from 'supertest';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/index';
import { hash } from 'bcryptjs';

let connection: Connection;

describe('Create Role Controller', async () => {
    beforeEach(async () => {
        connection = await createConnection();

        const id = uuid();

        const password = await hash('admin', 8);
    });
    it('shoud be able to create a new role', async () => {
        const response = await request(app).post('/roles').send({
            name: 'Admin',
        });

        expect(response.status).toBe(200);
    });
});
