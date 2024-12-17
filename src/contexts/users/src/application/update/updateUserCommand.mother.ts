import UserMother from "@src/domain/user.mother";
import UpdateUserCommand, { UpdateUserCommandData } from "./updateUserCommand";
import RoleMother from "@context/roles/domain/role.mother";
import UsernameMother from "@src/domain/username.mother";

export default class UpdateUserCommandMother {
    static create(data: UpdateUserCommandData): UpdateUserCommand {
        return new UpdateUserCommand(data);
    }

    static random(): UpdateUserCommand {
        const username: string = UsernameMother.random().toString();

        return UpdateUserCommandMother.create({
            user: UserMother.random({ username: username }).toPrimitives(),
            role: RoleMother.random().toPrimitives(),
            username: username
        });
    }

    static applyCommand(command: UpdateUserCommand) {
        return {  
            user: UserMother.random(command.data.user),
            role: RoleMother.random(command.data.role)
        };
    }
}

