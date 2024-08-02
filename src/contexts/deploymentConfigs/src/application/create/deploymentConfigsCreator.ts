import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import CreateDeploymentConfigsCommand from "./createDeploymentConfigsCommand";
import DeploymentConfigs from "@src/domain/deploymentConfigs";
import DeploymentConfigsAlreadyExistsError from "@src/domain/errors/deploymentConfigsAlreadyExistsError";

export default class DeploymentConfigsCreator{
    private readonly repository: DeploymentConfigsRepository;

    private readonly eventbus: EventBus;
    
    constructor(repository: DeploymentConfigsRepository, eventbus: EventBus){
        this.repository = repository;
        this.eventbus = eventbus;
    }

    async run (command: CreateDeploymentConfigsCommand): Promise<void>{
        const deploymentConfigs = DeploymentConfigs.create(command.data);

        const aux = await this.repository.find(deploymentConfigs.id);
        if(aux !== null)
            throw new DeploymentConfigsAlreadyExistsError(deploymentConfigs.id.value);

        await this.repository.create(deploymentConfigs);
        await this.eventbus.publish(deploymentConfigs.pullDomainEvents());
    }
}