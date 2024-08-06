import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import RemoveEnvironmentCommand from "./removeEnvironmentCommand";
import Command from "@context/shared/domain/commandBus/command";
import EnvironmentRemover from "./environmentRemover";

export default class RemoveEnvironmentCommandHandler implements CommandHandler<RemoveEnvironmentCommand>{
    private readonly remover: EnvironmentRemover;

    constructor(remover: EnvironmentRemover){
        this.remover = remover;
    }
    
    subscribedTo(): Command {
        return RemoveEnvironmentCommand;
    }

    handle(command: RemoveEnvironmentCommand): Promise<void> {
        return this.remover.run(command);
    }
}