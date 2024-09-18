import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UserRemover from "./userRemover";
import RemoveUserCommand from "./removeUserCommand";

export default class RemoveUserCommandHandler implements CommandHandler<RemoveUserCommand> {
    private readonly remover: UserRemover;

    constructor(remover: UserRemover) {
        this.remover = remover;
    }

    subscribedTo(): Command {
        return RemoveUserCommand;
    }

    handle(command: RemoveUserCommand): Promise<void> {
        return this.remover.run(command);
    }
}