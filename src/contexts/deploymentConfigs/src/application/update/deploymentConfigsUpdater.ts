import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DeploymentConfigsFinder from "@src/domain/deploymentConfigsFinder";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import UpdateDeploymentConfigsCommand from "./updateDeploymentConfigsCommand";
import DeploymentConfigsNotFoundError from "@src/domain/errors/deploymentConfigsNotFoundError";
import DeploymentConfigsMissingParameterError from "@src/domain/errors/deploymentConfigsMissingParameterError";

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
        const { data, permissions } = command;

        if(!data.id) {
            throw new DeploymentConfigsMissingParameterError();
        }

        const deploymentConfigs = await this.finder.find(data.id, permissions.environmentIds);

        if(!deploymentConfigs) {
            throw new DeploymentConfigsNotFoundError(data.id);
        }

        const newDeploymentConfigs = deploymentConfigs.update(command.data);

        await this.repository.update(newDeploymentConfigs);
        await this.eventBus.publish(newDeploymentConfigs.pullDomainEvents());
    }
}