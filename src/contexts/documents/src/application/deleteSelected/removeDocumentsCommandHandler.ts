import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import RemoveDocumentsCommand from "./removeDocumentsCommand";
import Command from "@context/shared/domain/commandBus/command";
import DocumentsRemover from "./documentsRemover";

export default class RemoveDocumentsCommandHandler implements CommandHandler<RemoveDocumentsCommand> {
    private readonly remover: DocumentsRemover;

    constructor(remover: DocumentsRemover) {
        this.remover = remover;
    }

    subscribedTo(): Command {
        return RemoveDocumentsCommand;
    }

    handle(command: RemoveDocumentsCommand): Promise<void> {
        return this.remover.run(command);
    }
}