import EnviromentRepository from "@src/domain/enviromentRepository";
import CreateEnviromentCommand from "./createEnviromentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import EnviromentAlreadyExistsError from "@src/domain/errors/enviromentAlreadyExistsError";
import Enviroment from "@src/domain/enviroment";

export default class EnviromentCreator {
    private readonly repository: EnviromentRepository;

    private readonly eventBus: EventBus;

    constructor(repository: EnviromentRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(command: CreateEnviromentCommand): Promise<void> {
        const newEnviroment = Enviroment.create(command.data);

        const enviroment = await this.repository.find(newEnviroment.id);
        if(enviroment !== null)
            throw new EnviromentAlreadyExistsError(newEnviroment.id.value);

        await this.repository.create(newEnviroment);
        await this.eventBus.publish(newEnviroment.pullDomainEvents());
    }
}