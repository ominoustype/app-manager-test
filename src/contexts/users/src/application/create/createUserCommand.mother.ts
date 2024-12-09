import UuidMother from "@context/shared/domain/uuid.mother";
import User from "../../domain/user";
import UserMother from "../../domain/user.mother";
import CreateUserCommand, { CreateUserCommandData } from "./createUserCommand";

export default class CreateUserCommandMother {
    static create(data: CreateUserCommandData): CreateUserCommand {
        return new CreateUserCommand(data);
    }

    static random(): CreateUserCommand {
        return CreateUserCommandMother.create({
            userPrimitives: UserMother.random().fullToPrimitives(),
            roleId: UuidMother.random().value
        });
    }

    static applyCommand(command: CreateUserCommand): User {
        return UserMother.random(command.data.userPrimitives);
    }
}

