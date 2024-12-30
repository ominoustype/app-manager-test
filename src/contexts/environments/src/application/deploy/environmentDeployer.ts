import EnvironmentFinder from "@src/domain/environmentFinder";
import EnvironmentRepository from "@src/domain/environmentRepository";
import DeployEnvironmentCommand from "./deployEnvironmentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import EnvironmentMissingParameter from "@src/domain/errors/environmentMissingParameterError";
import EnvironmentNotFoundError from "@src/domain/errors/environmentNotFoundError";
import logger from "@context/shared/infrastructure/logger";

export default class EnvironmentDeployer {
    private readonly repository: EnvironmentRepository;

    private readonly eventBus: EventBus;

    private readonly finder: EnvironmentFinder;

    constructor(repository: EnvironmentRepository, eventBus: EventBus){
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new EnvironmentFinder(repository);
    }

    async run(command: DeployEnvironmentCommand): Promise<void>{
        const { data, deploymentConfigsId } = command.data;

        logger.info("Deploying environment with ", { data });

        if(!data.id) {
            throw new EnvironmentMissingParameter();
        }

        const environment = await this.finder.find(data.id);

        if(!environment) {
            throw new EnvironmentNotFoundError(data.id);
        }

        const newEnvironment = environment.deploy(data, deploymentConfigsId);

        await this.repository.update(newEnvironment);
        
        await this.eventBus.publish(newEnvironment.pullDomainEvents());
    }
}