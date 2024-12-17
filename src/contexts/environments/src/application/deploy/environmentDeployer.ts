import EnvironmentFinder from "@src/domain/environmentFinder";
import EnvironmentRepository from "@src/domain/environmentRepository";
import DeployEnvironmentCommand from "./deployEnvironmentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";

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
        const { primitives, deploymentConfigsId } = command.data;

        if(!primitives.id)
            return;

        const environment = await this.finder.find(primitives.id);

        if(environment === null)
            return;

        const newEnvironment = environment.deploy(primitives, deploymentConfigsId);

        await this.repository.update(newEnvironment);
        
        await this.eventBus.publish(newEnvironment.pullDomainEvents());
    }
}