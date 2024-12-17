import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import PushDocumentCommand from "./pushDocumentCommand";
import Command from "@context/shared/domain/commandBus/command";
import DocumentPusher from "./documentPusher";

export default class PushDocumentCommandHandler implements CommandHandler<PushDocumentCommand> {
    private readonly pusher: DocumentPusher;

    constructor(pusher: DocumentPusher) {
        this.pusher = pusher;
    }

    subscribedTo(): Command {
        return PushDocumentCommand;
    }

    handle(command: PushDocumentCommand): Promise<void> {
        return this.pusher.run(command);
    }
}