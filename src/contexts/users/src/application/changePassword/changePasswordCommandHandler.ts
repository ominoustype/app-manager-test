import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import PasswordChanger from "./passwordChanger";
import ChangePasswordCommand from "./changePasswordCommand";

export default class ChangePasswordCommandHandler implements CommandHandler<ChangePasswordCommand> {
    private readonly changer: PasswordChanger;

    constructor(changer: PasswordChanger) {
        this.changer = changer;
    }

    subscribedTo(): Command {
        return ChangePasswordCommand;
    }

    handle(command: ChangePasswordCommand): Promise<void> {
        return this.changer.run(command);
    }
}