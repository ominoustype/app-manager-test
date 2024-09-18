import UsernameMother from "@src/domain/username.mother";
import LogoutUserCommand, { LogoutUserCommandData } from "./logoutUserCommand";

export default class LogoutUserCommandMother {
    static create(data: LogoutUserCommandData): LogoutUserCommand {
        return new LogoutUserCommand(data);
    }

    static random(): LogoutUserCommand {
        return LogoutUserCommandMother.create({
            username: UsernameMother.random().toString()
        });
    }
}

