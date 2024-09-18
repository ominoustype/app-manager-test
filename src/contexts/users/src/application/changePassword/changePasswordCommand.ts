import Command from "@context/shared/domain/commandBus/command";

export type ChangePasswordCommandParams = {
    username: string, 
    oldPassword: string, 
    newPassword: string
};


export default class ChangePasswordCommand extends Command {
    readonly username: string;
    readonly oldPassword: string;
    readonly newPassword: string;

    constructor(params: ChangePasswordCommandParams) {
        super();
        this.username = params.username;
        this.oldPassword = params.oldPassword;
        this.newPassword = params.newPassword;
    }
}