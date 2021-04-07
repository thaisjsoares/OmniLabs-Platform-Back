import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm/index';

let connection: Connection;

describe('List Login Logs Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.close();
    });

    it('shoud be able to list login logs', async () => {
        const response = await request(app).get('/loginLogs').query({
            page: 1,
            limit: 5,
        });

        expect(response.status).toBe(200);
    });
});
