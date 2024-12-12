import User from "../../domain/user";
import UserMother from "../../domain/user.mother";
import RemoveUserCommand, { RemoveUserCommandData } from "./removeUserCommand";

export default class RemoveUserCommandMother {
    static create(data: RemoveUserCommandData): RemoveUserCommand {
        return new RemoveUserCommand(data);
    }

    static random(): RemoveUserCommand {
        return RemoveUserCommandMother.create(
            UserMother.random().toPrimitives()
        );
    }

    static applyCommand(command: RemoveUserCommand): User {
        return UserMother.random(command.data);
    }
}

