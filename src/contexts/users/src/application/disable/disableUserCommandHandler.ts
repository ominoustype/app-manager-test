import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UserDisabler from "./userDisabler";
import DisableUserCommand from "./disableUserCommand";

export default class DisableUserCommandHandler implements CommandHandler<DisableUserCommand> {
    private readonly disabler: UserDisabler;

    constructor(disabler: UserDisabler) {
        this.disabler = disabler;
    }

    subscribedTo(): Command {
        return DisableUserCommand;
    }

    handle(command: DisableUserCommand): Promise<void> {
        return this.disabler.run(command);
    }
}