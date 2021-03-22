import { getRepository, Repository } from 'typeorm'

import Groups from '../entities/Groups'

import IGroupsRepository from '@modules/groups/repositories/IGroupsRepository'
import ICreateGroupDTO from '@modules/groups/dtos/ICreateGroupDTO'

class GroupsRepository implements IGroupsRepository {
    private ormRepository: Repository<Groups>;

    constructor () {
      this.ormRepository = getRepository(Groups)
    }

    public async findById (id: string): Promise<Groups | undefined> {
      const group = await this.ormRepository.findOne(id)

      return group
    }

    public async create (data: ICreateGroupDTO): Promise<Groups> {
      const group = await this.ormRepository.create(data)

      await this.ormRepository.save(group)

      return group
    }

    public async save (groups: Groups): Promise<Groups> {
      return this.ormRepository.save(groups)
    }

    public async findByJourney (journey_id: string): Promise<Groups[]> {
      const groups = await this.ormRepository.find({
        where: {
          journey_id: journey_id
        }
      })

      return groups
    }
}

export default GroupsRepository
