import EnvironmentId from "./environmentId";
import EnvironmentRepository from "./environmentRepository";
import Environment from "./environment";
import EnvironmentNotFoundError from "./errors/environmentNotFoundError";

export default class EnvironmentFinder {
    private readonly environmentRepository: EnvironmentRepository;

    constructor(environmentRepository: EnvironmentRepository) {
        this.environmentRepository = environmentRepository;
    }

    async find(id: string): Promise<Environment> {
        const environment = await this.environmentRepository.find(new EnvironmentId(id));

        if (!environment) {
            throw new EnvironmentNotFoundError(id);
        }

        return environment;
    }
}