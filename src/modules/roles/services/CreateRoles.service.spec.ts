import FakeRolesRepository from '@modules/roles/repositories/fakes/FakeRolesRepository';
import AppError from '../../../shared/errors/AppError';

import CreateRole from './CreateRoles.service';

let createRole: CreateRole;
let fakeRolesRepository: FakeRolesRepository;

describe('Create Role', () => {
    beforeEach(() => {
        fakeRolesRepository = new FakeRolesRepository();

        createRole = new CreateRole(fakeRolesRepository);
    });

    it('should be able to create a role', async () => {
        expect(
            await createRole.execute({
                name: 'Admin',
            }),
        ).toHaveProperty('id');
    });

    it('should not be able to create role if name of role already exists', async () => {
        await createRole.execute({
            name: 'Admin',
        });

        await expect(
            createRole.execute({
                name: 'Admin',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
