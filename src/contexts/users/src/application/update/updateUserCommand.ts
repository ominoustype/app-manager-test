import { RolePrimitives } from "@context/roles/domain/role";
import { UserPrimitives } from "../../domain/user";
import Command from "@context/shared/domain/commandBus/command";

export type UpdateUserCommandData = {
    username: string,
    user: Partial<UserPrimitives>,
    role: Partial<RolePrimitives>
}

export default class UpdateUserCommand extends Command {
    readonly data: UpdateUserCommandData;

    constructor(data: UpdateUserCommandData) {
        super();
        this.data = data;
    }
}