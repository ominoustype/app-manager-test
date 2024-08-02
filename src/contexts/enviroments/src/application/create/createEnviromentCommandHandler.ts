import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import CreateEnviromentCommand from "./createEnviromentCommand";
import EnviromentCreator from "./enviromentCreator";

export default class CreateEnviromentCommandHandler implements CommandHandler<CreateEnviromentCommand>{
    readonly creator: EnviromentCreator;

    constructor(creator: EnviromentCreator){
        this.creator = creator;
    }
    
    subscribedTo(): Command {
        return CreateEnviromentCommand;
    }

    handle(command: CreateEnviromentCommand): Promise<void> {
        return this.creator.run(command);
    }
}