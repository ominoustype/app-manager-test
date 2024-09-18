import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UserLoggerOut from "./userLoggerOut";
import LogoutUserCommand from "./logoutUserCommand";

export default class LogOutUserCommandHandler implements CommandHandler<LogoutUserCommand> {
    private readonly loggerOut: UserLoggerOut;

    constructor(loggerOut: UserLoggerOut) {
        this.loggerOut = loggerOut;
    }

    subscribedTo(): Command {
        return LogoutUserCommand;
    }

    handle(command: LogoutUserCommand): Promise<void> {
        return this.loggerOut.run(command);
    }
}