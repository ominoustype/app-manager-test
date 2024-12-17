import RoleMother from "@context/roles/domain/role.mother";
import User from "../../domain/user";
import UserMother from "../../domain/user.mother";
import CreateUserCommand, { CreateUserCommandData } from "./createUserCommand";
import UsernameMother from "@src/domain/username.mother";

export default class CreateUserCommandMother {
    static create(data: CreateUserCommandData): CreateUserCommand {
        return new CreateUserCommand(data);
    }

    static random(): CreateUserCommand {
        return CreateUserCommandMother.create({
            user: UserMother.random().toPrimitives(),
            role: RoleMother.random().toPrimitives(),
            username: UsernameMother.random.toString()
        });
    }

    static applyCommand(command: CreateUserCommand): User {
        return UserMother.random(command.data.user);
    }
}

