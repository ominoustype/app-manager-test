import Command from "@context/shared/domain/commandBus/command";

export type LogoutUserCommandData = {
    username: string,
    accessToken: string,
    refreshToken: string
};

export default class LogoutUserCommand extends Command {
    readonly data: LogoutUserCommandData;

    constructor(data: LogoutUserCommandData) {
        super();
        this.data = data;
    }
}