import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import RemoveEnviromentCommand from "./removeEnviromentCommand";
import Command from "@context/shared/domain/commandBus/command";
import EnviromentRemover from "./enviromentRemover";

export default class RemoveEnviromentCommandHandler implements CommandHandler<RemoveEnviromentCommand>{
    private readonly remover: EnviromentRemover;

    constructor(remover: EnviromentRemover){
        this.remover = remover;
    }
    
    subscribedTo(): Command {
        return RemoveEnviromentCommand;
    }

    handle(command: RemoveEnviromentCommand): Promise<void> {
        return this.remover.run(command);
    }
}