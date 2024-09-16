import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import RemoveRoleCommand from "./removeRoleCommand";
import RoleRemover from "./roleRemover";

export default class RemoveRoleCommandHandler implements CommandHandler<RemoveRoleCommand> {
    private readonly remover: RoleRemover;

    constructor(remover: RoleRemover) {
        this.remover = remover;
    }
    
    subscribedTo(): Command {
        return RemoveRoleCommand;
    }

    handle(command: RemoveRoleCommand): Promise<void> {
        return this.remover.run(command);
    }
}