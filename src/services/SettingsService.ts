import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingsService {
    private settingsRepo: Repository<Setting>;
    constructor() {
        this.settingsRepo = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {
        const userExists = await this.settingsRepo.findOne({ username });
        if (userExists) {
            throw new Error("User already exists");
        }

        const setting = this.settingsRepo.create({
            chat,
            username,
        });

        await this.settingsRepo.save(setting);

        return setting;
    }

    async findByUsername(username: string) {
        const settings = await this.settingsRepo.findOne({
            username,
        });

        return settings;
    }

    async update(username: string, chat: boolean) {
        await this.settingsRepo
            .createQueryBuilder()
            .update(Setting)
            .set({ chat })
            .where("username = :username", {
                username,
            })
            .execute();
    }
}

export { SettingsService };
