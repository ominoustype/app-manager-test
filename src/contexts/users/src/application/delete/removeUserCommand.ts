import Command from "@context/shared/domain/commandBus/command";

export type RemoveUserCommandData = { username: string };


export default class RemoveUserCommand extends Command {
    readonly data: RemoveUserCommandData;

    constructor(data: RemoveUserCommandData) {
        super();
        this.data = data;
    }
}