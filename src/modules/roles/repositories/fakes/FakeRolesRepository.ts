import { v4 } from 'uuid'

import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO'
import IRolesRepository from '../IRolesRepository'

import Roles from '@modules/roles/infra/typeorm/entities/Roles'

class FakeRolesRepository implements IRolesRepository {
    private roles: Roles[] = [];

    public async findByName (name: string): Promise<Roles | undefined> {
      const role = this.roles.find(role => role.name === name)

      return role
    }

    public async findById (id: string): Promise<Roles | undefined> {
      const role = this.roles.find(role => role.id === id)

      return role
    }

    public async create (data: ICreateGroupDTO): Promise<Roles> {
      const role = new Roles()

      Object.assign(role, { id: v4() }, data)

      this.roles.push(role)

      return role
    }

    public async save (role: Roles): Promise<Roles> {
      const findIndex = this.roles.findIndex(
        findJourney => findJourney.id === role.id
      )

      this.roles[findIndex] = role

      return role
    }
}

export default FakeRolesRepository
