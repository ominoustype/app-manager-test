import EnviromentId from "./enviromentId";
import EnviromentRepository from "./enviromentRepository";
import Enviroment from "./enviroment";
import EnviromentNotFoundError from "./errors/enviromentNotFoundError";

export default class EnviromentFinder {
    private readonly enviromentRepository: EnviromentRepository;

    constructor(enviromentRepository: EnviromentRepository) {
        this.enviromentRepository = enviromentRepository;
    }

    async find(id: string): Promise<Enviroment> {
        const enviroment = await this.enviromentRepository.find(new EnviromentId(id));

        if (!enviroment) {
            throw new EnviromentNotFoundError(id);
        }

        return enviroment;
    }
}