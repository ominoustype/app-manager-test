import Command from "@context/shared/domain/commandBus/command";

export type DisableUserCommandData = {username: string};


export default class DisableUserCommand extends Command {
    readonly username: string;

    constructor(data: DisableUserCommandData) {
        super();
        this.username = data.username;
    }
}