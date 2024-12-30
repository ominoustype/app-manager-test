import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import DeploymentConfigsFinder from "@src/domain/deploymentConfigsFinder";
import RemoveDeploymentConfigsCommand from "./removeDeploymentConfigsCommand";
import logger from "@context/shared/infrastructure/logger";
import DeploymentConfigsNotFoundError from "@src/domain/errors/deploymentConfigsNotFoundError";
import DeploymentConfigsMissingParameterError from "@src/domain/errors/deploymentConfigsMissingParameterError";

export default class DeploymentConfigsRemover{
    private readonly repository: DeploymentConfigsRepository;

    private readonly eventBus: EventBus;

    private readonly finder: DeploymentConfigsFinder;

    constructor(repository: DeploymentConfigsRepository, eventBus: EventBus){
        this.eventBus = eventBus;
        this.repository = repository;
        this.finder = new DeploymentConfigsFinder(repository);
    }

    async run(command: RemoveDeploymentConfigsCommand): Promise<void>{
        const { data, permissions } = command;

        logger.info("Deleting deploymentConfigs with ", { data });

        if(!data?.id) { 
            throw new DeploymentConfigsMissingParameterError();
        }

        const deploymentConfigs = await this.finder.find(data.id, permissions.environmentIds);

        if(!deploymentConfigs) {
            throw new DeploymentConfigsNotFoundError(data.id);
        }
        
        deploymentConfigs.delete();

        await this.repository.delete(deploymentConfigs);
        await this.eventBus.publish(deploymentConfigs.pullDomainEvents());
    }
}