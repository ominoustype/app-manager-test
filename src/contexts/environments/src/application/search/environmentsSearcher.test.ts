import EnvironmentRepositoryMock from "@src/__mock__/environmentRepositoryMock";
import SearchEnvironmentsQueryHandler from "./searchEnvironmentsQueryHandler";
import EnvironmentsSearcher from "./environmentsSearcher";
import SearchEnvironmentsQueryMother from "./searchEnvironmentsQuery.mother";
import EnvironmentsMother from "@src/domain/environments.mother";
import SearchEnvironmentsResponseMother from "./searchEnvironmentsResponse.mother";

describe('environmentsSearcher', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            handler = new SearchEnvironmentsQueryHandler(
                new EnvironmentsSearcher(repository)
            ),
            query = SearchEnvironmentsQueryMother.random();

        repository.whenSearchThenReturn(EnvironmentsMother.empty());

        await handler.handle(query);

        repository.assertSearchHasBeenCalledWith(query.params);
    });

    it('should return an empty response when there are no Environments', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            handler = new SearchEnvironmentsQueryHandler(
                new EnvironmentsSearcher(repository)
            ),
            query = SearchEnvironmentsQueryMother.random();

        repository.whenSearchThenReturn(EnvironmentsMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchEnvironmentsResponseMother.empty());
    });
    
    it('should return a response with Environments when there are Environments', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            handler = new SearchEnvironmentsQueryHandler(
                new EnvironmentsSearcher(repository)
            ),
            query = SearchEnvironmentsQueryMother.random(),
            environments = EnvironmentsMother.random(),
            expected = SearchEnvironmentsResponseMother.fromEnvironments(environments);

        repository.whenSearchThenReturn(environments);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
});