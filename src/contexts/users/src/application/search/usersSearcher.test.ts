import UserRepositoryMock from "@src/__mock__/userRepositoryMock";
import SearchUsersQueryHandler from "./searchUsersQueryHandler";
import UsersSearcher from "./usersSearcher";
import SearchUsersQueryMother from "./searchUsersQuery.mother";
import UsersMother from "@src/domain/users.mother";
import SearchUsersResponseMother from "./searchUsersResponse.mother";


describe('userSearcher', () => {
    it('should return an empty response when there are no users', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            handler = new SearchUsersQueryHandler(
                new UsersSearcher(repository)
            ),
            query = SearchUsersQueryMother.random();

        repository.whenSearchThenReturn(UsersMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchUsersResponseMother.empty());
    });

    it('should return a response with users when there are users', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            handler = new SearchUsersQueryHandler(
                new UsersSearcher(repository)
            ),
            query = SearchUsersQueryMother.random(),
            users = UsersMother.random(),
            expected = SearchUsersResponseMother.fromUsers(users);

        repository.whenSearchThenReturn(users);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });

    it('should call the repository with the query filters', async () => {
        expect.hasAssertions();

        const repository = new UserRepositoryMock(),
            handler = new SearchUsersQueryHandler(
                new UsersSearcher(repository)
            ),
            query = SearchUsersQueryMother.random();

        repository.whenSearchThenReturn(UsersMother.empty());

        await handler.handle(query);

        repository.assertSearchHasBeenCalledWith(query.params);
    });
});
