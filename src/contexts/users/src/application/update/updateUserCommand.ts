import { UserPrimitives } from "../../domain/user";
import Command from "@context/shared/domain/commandBus/command";

export type UpdateUserCommandData = Partial<UserPrimitives>;


export default class UpdateUserCommand extends Command {
    readonly data: UpdateUserCommandData;

    constructor(data: UpdateUserCommandData) {
        super();
        this.data = data;
    }
}