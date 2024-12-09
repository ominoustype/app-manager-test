import DisableUserCommand, { DisableUserCommandData } from "./disableUserCommand";
import UsernameMother from "@src/domain/username.mother";

export default class DisableUserCommandMother {
    static create(data: DisableUserCommandData): DisableUserCommand {
        return new DisableUserCommand(data);
    }

    static random(overwrites = {}): DisableUserCommand {
        return this.create({
            username: UsernameMother.random().toString(),
            ...overwrites
        });
    }
}

