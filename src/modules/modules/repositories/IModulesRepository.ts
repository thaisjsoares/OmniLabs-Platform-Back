import ICreateModuleDTO from '../dtos/ICreateModuleDTO';
import Module from '../infra/typeorm/entities/Module';

export default interface IModulesRepository {
    findById(id: string): Promise<Module | undefined>;
    create(data: ICreateModuleDTO): Promise<Module>;
    save(module: Module): Promise<Module>;
}
