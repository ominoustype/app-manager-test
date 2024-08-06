import EnvironmentFinder from "@src/domain/environmentFinder";
import EnvironmentRepository from "@src/domain/environmentRepository";
import UpdateEnvironmentCommand from "./updateEnvironmentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";

export default class EnvironmentUpdater {
    private readonly repository: EnvironmentRepository;

    private readonly eventBus: EventBus;

    private readonly finder: EnvironmentFinder;

    constructor(repository: EnvironmentRepository, eventBus: EventBus){
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new EnvironmentFinder(repository);
    }

    async run(command: UpdateEnvironmentCommand): Promise<void>{
        if(!command.data.id)
            return;

        const environment = await this.finder.find(command.data.id);

        if(environment === null)
            return;

        const newEnvironment = environment.update(command.data);

        await this.repository.update(newEnvironment);
        await this.eventBus.publish(newEnvironment.pullDomainEvents());
    }
}