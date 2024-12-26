import EnvironmentFinder from "@src/domain/environmentFinder";
import EnvironmentRepository from "@src/domain/environmentRepository";
import RemoveEnvironmentCommand from "./removeEnvironmentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";

export default class EnvironmentRemover {
    private readonly repository: EnvironmentRepository;

    private readonly eventBus: EventBus;

    private readonly finder: EnvironmentFinder;

    constructor(repository: EnvironmentRepository, eventBus: EventBus){
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new EnvironmentFinder(repository);
    }

    async run(command: RemoveEnvironmentCommand): Promise<void>{
        const { data, permissions } = command;

        if(!data.id)
            return;

        if(permissions.environmentIds.includes(data.id)) { 
            return;
        }

        const environment = await this.finder.find(data.id);   
        if(environment===null)
            return;

        environment.delete();

        await this.repository.delete(environment);
        await this.eventBus.publish(environment.pullDomainEvents());
    }
}