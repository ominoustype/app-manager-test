/*
import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import LogOutUserCommandHandler from "./logoutUserCommandHandler";
import UserLoggerOut from "./userLoggerOut";
import LogoutUserCommandMother from "./logoutUserCommand.mother";
import UsernameMother from "@src/domain/username.mother";
import TokenGeneratorMock from "@src/__mock__/tokenGeneratorMock";

describe('userLoggerOut', () => {
    /*it('should log out user', async () => {
      /*  expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            handler = new LogOutUserCommandHandler(
                new UserLoggerOut(repository, new TokenGeneratorMock())
            ),
            command = LogoutUserCommandMother.random();

        await handler.handle(command);

        repository.ensureDeleteSessionCalledWith(
            UsernameMother.create(command.data.username)
        );
    });
    }
})
*/