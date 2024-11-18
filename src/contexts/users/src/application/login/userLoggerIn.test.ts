/*import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import LogInUserQueryHandler from "./loginUserQueryHandler";
import UserLoggerIn from "./userLoggerIn";
import UserMother from "@src/domain/user.mother";
import LoginUserQueryMother from "./loginUserQuery.mother";
import LoginUserResponseMother from "./loginUserResponse.mother";
import UsernameMother from "@src/domain/username.mother";
import TokenGeneratorMock from "@src/__mock__/tokenGeneratorMock";
import SessionNotFoundError from "@src/domain/errors/sessionNotFoundError";
import TokenMother from "@src/domain/session/token.mother";

describe('userLoggerIn', () => {
    describe('when the user has not a valid session', () => {
        it.skip("should throw a SessionNotFoundError whenever the user hasn't a valid session", async () => {
            expect.hasAssertions();

            const repository = new UserRepositoryMock(),
                generator = new TokenGeneratorMock(),
                queryHandler = new LogInUserQueryHandler(
                    new UserLoggerIn(repository, generator)
                ),
                user = UserMother.random(),
                query = LoginUserQueryMother.fromUser(user);

            repository.whenFindByUsernameThenReturn(user);
            generator.whenIsValidThenReturn(false);

            await expect(queryHandler.handle(query)).rejects.toThrow(
                SessionNotFoundError
            );
        });
    });

    describe('when the user has a valid session', () => {
        it('should return the session whenever the user has a valid session', async () => {
            expect.hasAssertions();

            const repository = new UserRepositoryMock(),
                generator = new TokenGeneratorMock(),
                queryHandler = new LogInUserQueryHandler(
                    new UserLoggerIn(repository, generator)
                ),
                user = UserMother.random(),
                token = TokenMother.random(),
                query = LoginUserQueryMother.fromUser(user),
                expected = LoginUserResponseMother.fromUser(user, token);

            repository.whenFindByUsernameThenReturn(user);
            generator.whenIsValidThenReturn(true);
            repository.whenGetSessionThenReturn(token);

            const response = await queryHandler.handle(query);

            expect(response).toStrictEqual(expected);
        });

        it('should find the user by username', async () => {
            expect.hasAssertions();

            const repository = new UserRepositoryMock(),
                generator = new TokenGeneratorMock(),
                queryHandler = new LogInUserQueryHandler(
                    new UserLoggerIn(repository, generator)
                ),
                user = UserMother.random(),
                token = TokenMother.random(),
                query = LoginUserQueryMother.fromUser(user);

            repository.whenFindByUsernameThenReturn(user);
            generator.whenIsValidThenReturn(true);
            repository.whenGetSessionThenReturn(token);

            await queryHandler.handle(query);

            repository.assertFindByUsernameHasBeenCalledWith(
                UsernameMother.create(query.username)
            );
        });
    });
});
*/