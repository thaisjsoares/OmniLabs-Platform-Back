/* eslint-disable no-shadow */
import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO';
import Roles from '@modules/roles/infra/entities/Roles';
import { v4 } from 'uuid';

import IRolesRepository from '../models/IRolesRepository';

class FakeRolesRepository implements IRolesRepository {
    private roles: Roles[] = [];

    findAll(): Promise<any[]> {
        throw new Error('Method not implemented.');
    }

    remove(role: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    public async findByName(name: string): Promise<Roles | undefined> {
        const role = this.roles.find(role => role.name === name);

        return role;
    }

    public async findById(id: string): Promise<Roles | undefined> {
        const role = this.roles.find(role => role.id === id);

        return role;
    }

    public async create(data: ICreateGroupDTO): Promise<Roles> {
        const role = new Roles();

        Object.assign(role, { id: v4() }, data);

        this.roles.push(role);

        return role;
    }

    public async save(role: Roles): Promise<Roles> {
        const findIndex = this.roles.findIndex(
            findJourney => findJourney.id === role.id,
        );

        this.roles[findIndex] = role;

        return role;
    }
}

export default FakeRolesRepository;
