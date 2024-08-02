import EnviromentFinder from "@src/domain/enviromentFinder";
import EnviromentRepository from "@src/domain/enviromentRepository";
import RemoveEnviromentCommand from "./removeEnviromentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";

export default class EnviromentRemover {
    private readonly repository: EnviromentRepository;

    private readonly eventBus: EventBus;

    private readonly finder: EnviromentFinder;

    constructor(repository: EnviromentRepository, eventBus: EventBus){
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new EnviromentFinder(repository);
    }

    async run(command: RemoveEnviromentCommand): Promise<void>{
        if(!command.data.id)
            return;

        const enviroment = await this.finder.find(command.data.id);   
        if(enviroment===null)
            return;

        enviroment.delete();

        await this.repository.delete(enviroment);
        await this.eventBus.publish(enviroment.pullDomainEvents());
    }
}