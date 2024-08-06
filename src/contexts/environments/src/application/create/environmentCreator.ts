import EnvironmentRepository from "@src/domain/environmentRepository";
import CreateEnvironmentCommand from "./createEnvironmentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import EnvironmentAlreadyExistsError from "@src/domain/errors/environmentAlreadyExistsError";
import Environment from "@src/domain/environment";

export default class EnvironmentCreator {
    private readonly repository: EnvironmentRepository;

    private readonly eventBus: EventBus;

    constructor(repository: EnvironmentRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(command: CreateEnvironmentCommand): Promise<void> {
        const newEnvironment = Environment.create(command.data);

        const environment = await this.repository.find(newEnvironment.id);
        if(environment !== null)
            throw new EnvironmentAlreadyExistsError(newEnvironment.id.value);

        await this.repository.create(newEnvironment);
        await this.eventBus.publish(newEnvironment.pullDomainEvents());
    }
}