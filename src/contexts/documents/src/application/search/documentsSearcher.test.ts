import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import SearchDocumentsQueryHandler from "./searchDocumentsQueryHandler";
import DocumentsSearcher from "./documentsSearcher";
import SearchDocumentsQueryMother from "./searchDocumentsQuery.mother";
import DocumentsMother from "@src/domain/documents.mother";
import SearchDocumentsResponseMother from "./searchDocumentsResponse.mother";

describe('documentsSearcher', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new SearchDocumentsQueryHandler(
                new DocumentsSearcher(repository)
            ),
            query = SearchDocumentsQueryMother.random();

        repository.whenSearchThenReturn(DocumentsMother.empty());

        await handler.handle(query);

        repository.assertSearchHasBeenCalledWith(query.params);
    });

    it('should return an empty response when there are no documents', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new SearchDocumentsQueryHandler(
                new DocumentsSearcher(repository)
            ),
            query = SearchDocumentsQueryMother.random();

        repository.whenSearchThenReturn(DocumentsMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchDocumentsResponseMother.empty());
    });
    
    it('should return a response with documents when there are documents', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new SearchDocumentsQueryHandler(
                new DocumentsSearcher(repository)
            ),
            query = SearchDocumentsQueryMother.random(),
            documents = DocumentsMother.random(),
            expected = SearchDocumentsResponseMother.fromDocuments(documents);

        repository.whenSearchThenReturn(documents);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
});
