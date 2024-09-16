import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import CreateRoleCommand from "./createRoleCommand";
import RoleCreator from "./roleCreator";

export default class CreateRoleCommandHandler implements CommandHandler<CreateRoleCommand> {
    private readonly creator: RoleCreator;

    constructor(creator: RoleCreator){
        this.creator = creator;
    }

    subscribedTo(): Command {
        return CreateRoleCommand;
    }

    handle(command: CreateRoleCommand): Promise<void> {
        return this.creator.run(command);
    }
}