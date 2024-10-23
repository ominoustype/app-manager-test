import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import SearchByEnvironmentDocumentsQueryHandler from "./searchByEnvironmentDocumentsQueryHandler";
import DocumentsByEnvironmentSearcher from "./documentsByEnvironmentSearcher";
import SearchByEnvironmentDocumentsQueryMother from "./searchByEnvironmentDocumentsQuery.mother";
import DocumentsMother from "@src/domain/documents.mother";
import SearchByEnvironmentDocumentsResponseMother from "./searchByEnvironmentDocumentsResponse.mother";

describe('documentsByEnvironmentSearcher', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new SearchByEnvironmentDocumentsQueryHandler(
                new DocumentsByEnvironmentSearcher(repository)
            ),
            query = SearchByEnvironmentDocumentsQueryMother.random();

        repository.whenSearchByEnvironmentThenReturn(DocumentsMother.empty());

        await handler.handle(query);

        repository.assertSearchByEnvironmentHasBeenCalledWith(query.params.environment);
    });

    it('should return an empty response when there are no documents', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new SearchByEnvironmentDocumentsQueryHandler(
                new DocumentsByEnvironmentSearcher(repository)
            ),
            query = SearchByEnvironmentDocumentsQueryMother.random();

        repository.whenSearchByEnvironmentThenReturn(DocumentsMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchByEnvironmentDocumentsResponseMother.empty());
    });
    
    it('should return a response with documents when there are documents', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new SearchByEnvironmentDocumentsQueryHandler(
                new DocumentsByEnvironmentSearcher(repository)
            ),
            query = SearchByEnvironmentDocumentsQueryMother.random(),
            documents = DocumentsMother.random(),
            expected = SearchByEnvironmentDocumentsResponseMother.fromDocuments(documents);

        repository.whenSearchByEnvironmentThenReturn(documents);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
});
