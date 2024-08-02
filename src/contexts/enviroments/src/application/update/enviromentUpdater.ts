import EnviromentFinder from "@src/domain/enviromentFinder";
import EnviromentRepository from "@src/domain/enviromentRepository";
import UpdateEnviromentCommand from "./updateEnviromentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";

export default class EnviromentUpdater {
    private readonly repository: EnviromentRepository;

    private readonly eventBus: EventBus;

    private readonly finder: EnviromentFinder;

    constructor(repository: EnviromentRepository, eventBus: EventBus){
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new EnviromentFinder(repository);
    }

    async run(command: UpdateEnviromentCommand): Promise<void>{
        if(!command.data.id)
            return;

        const enviroment = await this.finder.find(command.data.id);

        if(enviroment === null)
            return;

        const newEnviroment = enviroment.update(command.data);

        await this.repository.update(newEnviroment);
        await this.eventBus.publish(newEnviroment.pullDomainEvents());
    }
}