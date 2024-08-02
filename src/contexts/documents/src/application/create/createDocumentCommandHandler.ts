import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import DocumentCreator from "./documentCreator";
import CreateDocumentCommand from "./createDocumentCommand";
import Command from "@context/shared/domain/commandBus/command";

export default class CreateDocumentCommandHandler implements CommandHandler<CreateDocumentCommand> {
    private readonly creator: DocumentCreator;

    constructor(creator: DocumentCreator) {
        this.creator = creator;
    }

    subscribedTo(): Command {
        return CreateDocumentCommand;
    }

    handle(command: CreateDocumentCommand): Promise<void> {
        return this.creator.run(command);
    }
}