import { UserPrimitives } from '@src/domain/user';
import Command from "@context/shared/domain/commandBus/command";

export type CreateUserCommandData = {
    userPrimitives: Omit<UserPrimitives, 'createdAt' | 'id' | 'status'>,
    roleId: string
}


export default class CreateUserCommand extends Command {
    readonly data: CreateUserCommandData;

    constructor(data: CreateUserCommandData) {
        super();
        this.data = data;
    }
}