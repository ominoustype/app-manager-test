import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DeploymentConfigsFinder from "@src/domain/deploymentConfigsFinder";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import UpdateDeploymentConfigsCommand from "./updateDeploymentConfigsCommand";

export default class DeploymentConfigsUpdater{
    readonly finder: DeploymentConfigsFinder;

    readonly eventBus: EventBus;

    readonly repository: DeploymentConfigsRepository;

    constructor(repository: DeploymentConfigsRepository, eventBus: EventBus){
        this.eventBus = eventBus;
        this.repository = repository
        this.finder = new DeploymentConfigsFinder(repository);
    }

    async run(command: UpdateDeploymentConfigsCommand){
        if(!command.data.id)
            return

        const deploymentConfigs = await this.finder.find(command.data.id, command.permissions.environmentIds);

        if(deploymentConfigs===null)
            return;

        const newDeploymentConfigs = deploymentConfigs.update(command.data);

        await this.repository.update(newDeploymentConfigs);
        await this.eventBus.publish(newDeploymentConfigs.pullDomainEvents());
    }
}