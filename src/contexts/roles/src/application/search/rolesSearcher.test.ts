import RoleRepositoryMock from "@src/__mock__/roleRepository";
import SearchRolesQueryHandler from "./searchRolesQueryHandler";
import RolesSearcher from "./rolesSearcher";
import SearchRolesQueryMother from "./searchRolesQuery.mother";
import RolesMother from "@src/domain/roles.mother";
import SearchRolesResponseMother from "./searchRolesResponse.mother";

describe('rolesSearcher', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            handler = new SearchRolesQueryHandler(
                new RolesSearcher(repository)
            ),
            query = SearchRolesQueryMother.random();
        
        repository.whenSearchThenReturn(RolesMother.empty());

        await handler.handle(query);

        repository.assertSearchHasBeenCalledWith(query.params);
    });

    it('should return an empty response when there are no roles', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            handler = new SearchRolesQueryHandler(
                new RolesSearcher(repository)
            ),
            query = SearchRolesQueryMother.random();
        
        repository.whenSearchThenReturn(RolesMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchRolesResponseMother.empty());
    });

    it('should return a response with roles when there are roles', async () => {
        expect.hasAssertions();

        const repository = new RoleRepositoryMock(),
            handler = new SearchRolesQueryHandler(
                new RolesSearcher(repository)
            ),
            query = SearchRolesQueryMother.random(),
            roles = RolesMother.random(),
            expected = SearchRolesResponseMother.fromRoles(roles);
        
        repository.whenSearchThenReturn(roles);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
});