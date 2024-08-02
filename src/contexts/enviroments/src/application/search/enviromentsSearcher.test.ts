import EnviromentRepositoryMock from "@src/__mock__/enviromentRepositoryMock";
import SearchEnviromentsQueryHandler from "./searchEnviromentsQueryHandler";
import EnviromentsSearcher from "./enviromentsSearcher";
import SearchEnviromentsQueryMother from "./searchEnviromentsQuery.mother";
import EnviromentsMother from "@src/domain/enviroments.mother";
import SearchEnviromentsResponseMother from "./searchEnviromentsResponse.mother";

describe('enviromentsSearcher', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock(),
            handler = new SearchEnviromentsQueryHandler(
                new EnviromentsSearcher(repository)
            ),
            query = SearchEnviromentsQueryMother.random();

        repository.whenSearchThenReturn(EnviromentsMother.empty());

        await handler.handle(query);

        repository.assertSearchHasBeenCalledWith(query.params);
    });

    it('should return an empty response when there are no Enviroments', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock(),
            handler = new SearchEnviromentsQueryHandler(
                new EnviromentsSearcher(repository)
            ),
            query = SearchEnviromentsQueryMother.random();

        repository.whenSearchThenReturn(EnviromentsMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchEnviromentsResponseMother.empty());
    });
    
    it('should return a response with Enviroments when there are Enviroments', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock(),
            handler = new SearchEnviromentsQueryHandler(
                new EnviromentsSearcher(repository)
            ),
            query = SearchEnviromentsQueryMother.random(),
            enviroments = EnviromentsMother.random(),
            expected = SearchEnviromentsResponseMother.fromEnviroments(enviroments);

        repository.whenSearchThenReturn(enviroments);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
});