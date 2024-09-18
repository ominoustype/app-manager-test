import { UserPrimitives } from "../../domain/user";
import Command from "@context/shared/domain/commandBus/command";

export type CreateUserCommandData = Omit<UserPrimitives, 'createdAt' | 'id'>;


export default class CreateUserCommand extends Command {
    readonly data: CreateUserCommandData;

    constructor(data: CreateUserCommandData) {
        super();
        this.data = data;
    }
}