import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import FindUserQueryHandler from "./findUserQueryHandler";
import UserFinder from "./userFinder";
import FindUserQueryMother from "./findUserQuery.mother";
import FindUserResponseMother from "./findUserResponse.mother";
import UserNotFoundError from "@src/domain/errors/userNotFoundError";
import Username from "@src/domain/username";

describe('userFinder', () => {
    it('should call the repository with the username', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            handler = new FindUserQueryHandler(
                new UserFinder(repository)
            ),
            query = FindUserQueryMother.random(),
            user = FindUserQueryMother.randomUser(query);

        repository.whenFindByUsernameThenReturn(user);

        await handler.handle(query);

            repository.assertFindByUsernameHasBeenCalledWith(new Username(query.username))
    });

    it('should find an user', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            handler = new FindUserQueryHandler(
                new UserFinder(repository)
            ),
            query = FindUserQueryMother.random(),
            user = FindUserQueryMother.randomUser(query),
            expected = FindUserResponseMother.create(user.toPrimitives());

        repository.whenFindByUsernameThenReturn(user);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
    
    it('should throw an UserNotFoundError when the user does not exist', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            handler = new FindUserQueryHandler(
                new UserFinder(repository)
            ),
            query = FindUserQueryMother.random();

        try {
            repository.whenFindByUsernameThenReturn(null);

            await handler.handle(query);
        } catch (e) {
            expect(e).toBeInstanceOf(UserNotFoundError);
        }
    });
});
