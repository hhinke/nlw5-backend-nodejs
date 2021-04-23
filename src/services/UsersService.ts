import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersService {
    private usersRepo: Repository<User>;
    constructor() {
        this.usersRepo = getCustomRepository(UsersRepository);
    }

    async create(email: string) {
        const userExists = await this.usersRepo.findOne({ email });

        if (userExists) {
            return userExists;
        }

        const user = this.usersRepo.create({
            email,
        });

        await this.usersRepo.save(user);

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepo.findOne({ email });

        return user;
    }
}

export { UsersService };
