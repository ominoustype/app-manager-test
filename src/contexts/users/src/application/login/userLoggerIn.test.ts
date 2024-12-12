import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import LogInUserQueryHandler from "./loginUserQueryHandler";
import UserLoggerIn from "./userLoggerIn";
import UserMother from "@src/domain/user.mother";
import LoginUserQueryMother from "./loginUserQuery.mother";
import TokenatorMock from "@src/__mock__/tokenatorMock";
import QueryBusMock from "@context/shared/__mocks__/queryBus.mock";
import PasswordValidatorMock from "@src/__mock__/passwordValidatorMock";
import UsernameMother from "@src/domain/username.mother";
import TokenMother from "@src/domain/session/token.mother";
import CreateRoleResponseMother from "@context/roles/application/create/createRoleResponse.mother";
import RoleMother from "@context/roles/domain/role.mother";


describe('userLoggerIn', () => {
    /*describe('when the user has not a valid session', () => {
        it("should throw a SessionNotFoundError whenever the user hasn't a valid session", async () => {
            expect.hasAssertions();

            const repository = new UserRepositoryMock(),
                tokenator = new TokenatorMock(),
                passWordValidator = new PasswordValidatorMock(),
                queryBus = new QueryBusMock(),
                queryHandler = new LogInUserQueryHandler(
                    new UserLoggerIn(repository, tokenator, passWordValidator, queryBus)
                ),
                user = UserMother.random(),
                query = LoginUserQueryMother.fromUser(user);

            repository.whenFindByUsernameThenReturn(user);
            tokenator.whenIsValidThenReturn(false);

            await expect(queryHandler.handle(query)).rejects.toThrow(
                SessionNotFoundError
            );
        });
    }); */

    describe.skip('when the user has a valid session', () => {
        /*it('should return the session whenever the user has a valid session', async () => {
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
        });*/
    });

    it('should login properly(find user by username, find role & validate password)', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            tokenator = new TokenatorMock(),
            passWordValidator = new PasswordValidatorMock(),
            queryBus = new QueryBusMock(),
            queryHandler = new LogInUserQueryHandler(
                new UserLoggerIn(repository, tokenator, passWordValidator, queryBus)
            ),
            user = UserMother.random(),
            role = RoleMother.random(),
            query = LoginUserQueryMother.fromUser(user);

        repository.whenFindByUsernameThenReturn(user);
        passWordValidator.whenValidateThenReturn(true);

        const roleResponse = CreateRoleResponseMother.random({
            ...role.toPrimitives(),
            id:user.role.id.value

        });
        queryBus.whenAskThenReturn(
            roleResponse
        );

        tokenator.whenGenerateAccessThenReturn("");
        tokenator.whenGenerateRefreshThenReturn("");

        await queryHandler.handle(query);

        repository.assertFindByUsernameHasBeenCalledWith(
            UsernameMother.create(query.username)
        );
    });

    it.skip('should find the user by username', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            tokenator = new TokenatorMock(),
            passWordValidator = new PasswordValidatorMock(),
            queryBus = new QueryBusMock(),
            queryHandler = new LogInUserQueryHandler(
                new UserLoggerIn(repository, tokenator, passWordValidator, queryBus)
            ),
            user = UserMother.random(),
            token = TokenMother.random(),
            query = LoginUserQueryMother.fromUser(user);

        repository.whenFindByUsernameThenReturn(user);
        tokenator.whenIsValidThenReturn(true);
        repository.whenGetSessionThenReturn(token);

        await queryHandler.handle(query);

        repository.assertFindByUsernameHasBeenCalledWith(
            UsernameMother.create(query.username)
        );
    });
});
