import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UserCreator from "./userCreator";
import CreateUserCommand from "./createUserCommand";

export default class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
    private readonly creator: UserCreator;

    constructor(creator: UserCreator) {
        this.creator = creator;
    }

    subscribedTo(): Command {
        return CreateUserCommand;
    }

    handle(command: CreateUserCommand): Promise<void> {
        return this.creator.run(command);
    }
}