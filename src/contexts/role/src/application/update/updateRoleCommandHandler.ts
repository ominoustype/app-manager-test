import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UpdateRoleCommand from "./updateRoleCommand";
import Command from "@context/shared/domain/commandBus/command";
import RoleUpdater from "./roleUpdater";

export default class UpdateRoleCommandHandler implements CommandHandler<UpdateRoleCommand> {
    private readonly updater: RoleUpdater;

    constructor(updater: RoleUpdater) {
        this.updater = updater
    }

    subscribedTo(): Command {
        return UpdateRoleCommand;
    }

    handle(command: UpdateRoleCommand): Promise<void> {
        return this.updater.run(command);
    }
}