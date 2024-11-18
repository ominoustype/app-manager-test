import UsernameMother from "@src/domain/username.mother";
import LogoutUserCommand, { LogoutUserCommandData } from "./logoutUserCommand";
import MotherCreator from "@context/shared/domain/motherCreator.mother";

export default class LogoutUserCommandMother {
    static create(data: LogoutUserCommandData): LogoutUserCommand {
        return new LogoutUserCommand(data);
    }

    static random(): LogoutUserCommand {
        return LogoutUserCommandMother.create({
            username: UsernameMother.random().toString(),
            accessToken:  MotherCreator.future().toISOString(),
            refreshToken:  MotherCreator.future().toISOString()
        });
    }
}
