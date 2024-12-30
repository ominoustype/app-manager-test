import EnvironmentFinder from "@src/domain/environmentFinder";
import EnvironmentRepository from "@src/domain/environmentRepository";
import RemoveEnvironmentCommand from "./removeEnvironmentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import EnvironmentMissingParameter from "@src/domain/errors/environmentMissingParameterError";
import EnvironmentAccessForbidden from "@src/domain/errors/environmentForbiddenAccessError";
import logger from "@context/shared/infrastructure/logger";

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

        logger.info("Deleting environment with ", { data });

        if(!data.id){
            throw new EnvironmentMissingParameter();
        }

        if(permissions.environmentIds.includes(data.id)) { 
            new EnvironmentAccessForbidden(data.id);
        }

        const environment = await this.finder.find(data.id);
        
        environment.delete();

        await this.repository.delete(environment);
        await this.eventBus.publish(environment.pullDomainEvents());
    }
}