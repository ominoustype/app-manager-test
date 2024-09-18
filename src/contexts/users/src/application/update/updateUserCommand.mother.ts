import User from "../../domain/user";
import UserMother from "../../domain/user.mother";
import UpdateUserCommand, { UpdateUserCommandData } from "./updateUserCommand";

export default class UpdateUserCommandMother {
    static create(data: UpdateUserCommandData): UpdateUserCommand {
        return new UpdateUserCommand(data);
    }

    static random(): UpdateUserCommand {
        return UpdateUserCommandMother.create(
            UserMother.random().fullToPrimitives()
        );
    }

    static applyCommand(command: UpdateUserCommand): User {
        return UserMother.random(command.data);
    }
}

