import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UserUpdater from "./userUpdater";
import UpdateUserCommand from "./updateUserCommand";

export default class UpdateUserCommandHandler implements CommandHandler<UpdateUserCommand> {
    private readonly updater: UserUpdater;

    constructor(updater: UserUpdater) {
        this.updater = updater;
    }

    subscribedTo(): Command {
        return UpdateUserCommand;
    }

    handle(command: UpdateUserCommand): Promise<void> {
        return this.updater.run(command);
    }
}