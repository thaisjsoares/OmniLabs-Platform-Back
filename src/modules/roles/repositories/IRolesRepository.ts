import Roles from '../infra/typeorm/entities/Roles';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<Roles | undefined>;
    findByName(name: string): Promise<Roles | undefined>;
    create(data: ICreateRoleDTO): Promise<Roles>;
    save(role: Roles): Promise<Roles>;
    findAll(): Promise<Roles[]>;
}
