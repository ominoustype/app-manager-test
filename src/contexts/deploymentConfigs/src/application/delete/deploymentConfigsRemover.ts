import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import DeploymentConfigsFinder from "@src/domain/deploymentConfigsFinder";
import RemoveDeploymentConfigsCommand from "./removeDeploymentConfigsCommand";

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
        if(!command.data.id)
            return;

        const deploymentConfigs = await this.finder.find(command.data.id);
        if(deploymentConfigs === null)
            return
        
        deploymentConfigs.delete();

        await this.repository.delete(deploymentConfigs);
        await this.eventBus.publish(deploymentConfigs.pullDomainEvents());
    }
}