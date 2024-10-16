import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import MoveDocumentCommand from "./moveDocumentCommand";
import Command from "@context/shared/domain/commandBus/command";
import DocumentMover from "./documentMover";

export default class MoveDocumentCommandHandler implements CommandHandler<MoveDocumentCommand> {
    private readonly mover: DocumentMover;

    constructor(mover: DocumentMover) {
        this.mover = mover;
    }

    subscribedTo(): Command {
        return MoveDocumentCommand;
    }

    handle(command: MoveDocumentCommand): Promise<void> {
        return this.mover.run(command);
    }
}