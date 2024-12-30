import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import CreateDeploymentConfigsCommand from "./createDeploymentConfigsCommand";
import DeploymentConfigs from "@src/domain/deploymentConfigs";
import DeploymentConfigsAlreadyExistsError from "@src/domain/errors/deploymentConfigsAlreadyExistsError";
import DeploymentConfigsForbiddenAccessError from "@src/domain/errors/deploymentConfigsForbiddenAccessError";

export default class DeploymentConfigsCreator{
    private readonly repository: DeploymentConfigsRepository;

    private readonly eventBus: EventBus;

    
    constructor(repository: DeploymentConfigsRepository, eventBus: EventBus){
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run (command: CreateDeploymentConfigsCommand): Promise<void>{
        const { data, permissions } = command;

        if(!permissions.environmentIds.includes(data.environment.id)) {
            throw new DeploymentConfigsForbiddenAccessError(data.environment.id);
        }

        const newDeploymentConfigs = DeploymentConfigs.create(data);

        const deploymentConfigs = await this.repository.find(newDeploymentConfigs.id);

        if(deploymentConfigs !== null) {
            throw new DeploymentConfigsAlreadyExistsError(newDeploymentConfigs.id.value);
        }

        await this.repository.create(newDeploymentConfigs);
        await this.eventBus.publish(newDeploymentConfigs.pullDomainEvents());
    }
}