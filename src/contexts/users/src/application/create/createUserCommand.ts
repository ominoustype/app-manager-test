import { UserPrimitives } from '@src/domain/user';
import Command from "@context/shared/domain/commandBus/command";
import { RolePrimitives } from '@context/roles/domain/role';

export type CreateUserCommandData = {
    user: Omit<UserPrimitives, 'createdAt' | 'id' | 'status'>,
    role: Omit<RolePrimitives, 'createdAt' | 'id' >,
    username: string
}

export default class CreateUserCommand extends Command {
    readonly data: CreateUserCommandData;

    constructor(data: CreateUserCommandData) {
        super();
        this.data = data;
    }
}