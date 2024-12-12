import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UndoPushDocumentCommand from "./undoPushDocumentCommand";
import Command from "@context/shared/domain/commandBus/command";
import DocumentUndoPusher from "./documentUndoPusher";

export default class UndoPushDocumentCommandHandler implements CommandHandler<UndoPushDocumentCommand>{
    private readonly undoPusher: DocumentUndoPusher;

    constructor(undoPusher: DocumentUndoPusher){
        this.undoPusher = undoPusher;
    }

    subscribedTo(): Command {
        return UndoPushDocumentCommand;
    }

    handle(command: UndoPushDocumentCommand): Promise<void> {
        return this.undoPusher.run(command);
    }
}