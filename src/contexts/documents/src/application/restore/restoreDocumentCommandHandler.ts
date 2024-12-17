import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import Command from "@context/shared/domain/commandBus/command";
import DocumentRestorer from "./documentRestorer";
import RestoreDocumentCommand from "./restoreDocumentCommand";

export default class RestoreDocumentCommandHandler implements CommandHandler<RestoreDocumentCommand>
{   readonly restorer: DocumentRestorer;

    constructor(restorer: DocumentRestorer){
        this.restorer = restorer;
    }

    subscribedTo(): Command {
        return RestoreDocumentCommand;
    }
    
    handle(command: RestoreDocumentCommand): Promise<void> {
        return this.restorer.run(command);
    }
}