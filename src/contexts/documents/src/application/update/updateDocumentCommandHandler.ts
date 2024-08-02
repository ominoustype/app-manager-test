import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UpdateDocumentCommand from "./updateDocumentCommand";
import Command from "@context/shared/domain/commandBus/command";
import DocumentUpdater from "./documentUpdater";

export default class UpdateDocumentCommandHandler implements CommandHandler<UpdateDocumentCommand> {
    private readonly updater: DocumentUpdater;

    constructor(updater: DocumentUpdater) {
        this.updater = updater;
    }

    subscribedTo(): Command {
        return UpdateDocumentCommand;
    }

    handle(command: UpdateDocumentCommand): Promise<void> {
        return this.updater.run(command);
    }
}