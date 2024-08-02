import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import RemoveDocumentCommand from "./removeDocumentCommand";
import Command from "@context/shared/domain/commandBus/command";
import DocumentRemover from "./documentRemover";

export default class RemoveDocumentCommandHandler implements CommandHandler<RemoveDocumentCommand> {
    private readonly remover: DocumentRemover;

    constructor(remover: DocumentRemover) {
        this.remover = remover;
    }

    subscribedTo(): Command {
        return RemoveDocumentCommand;
    }

    handle(command: RemoveDocumentCommand): Promise<void> {
        return this.remover.run(command);
    }
}