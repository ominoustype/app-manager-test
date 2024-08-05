import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import CreateEnvironmentCommand from "./createEnvironmentCommand";
import EnvironmentCreator from "./environmentCreator";

export default class CreateEnvironmentCommandHandler implements CommandHandler<CreateEnvironmentCommand>{
    readonly creator: EnvironmentCreator;

    constructor(creator: EnvironmentCreator){
        this.creator = creator;
    }
    
    subscribedTo(): Command {
        return CreateEnvironmentCommand;
    }

    handle(command: CreateEnvironmentCommand): Promise<void> {
        return this.creator.run(command);
    }
}