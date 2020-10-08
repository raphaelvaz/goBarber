import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import { getRepository, Repository } from 'typeorm';

class UsersRepository implements IUserRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email }
        })
        return user;
    }
    public async create({ email, name, password }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({ email, name, password });

        await this.ormRepository.save(user);

        return user;
    }
    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}
export default UsersRepository;
