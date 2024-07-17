import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import FindDocumentQueryHandler from "./findDocumentQueryHandler";
import DocumentFinder from "./documentFinder";
import FindDocumentQueryMother from "./findDocumentQuery.mother";
import FindDocumentResponseMother from "./findDocumentResponse.mother";
import DocumentNotFoundError from "@src/domain/errors/documentNotFoundError";
import Uuid from "@context/shared/domain/uuid";

describe('documentFinder', () => {
    it('should call the repository with the id', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new FindDocumentQueryHandler(
                new DocumentFinder(repository)
            ),
            query = FindDocumentQueryMother.random(),
            document = FindDocumentQueryMother.randomDocument(query);

        repository.whenFindThenReturn(document);

        await handler.handle(query);

        repository.assertFindHasBeenCalledWith(new Uuid(query.id))
    });

    it('should find a document', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new FindDocumentQueryHandler(
                new DocumentFinder(repository)
            ),
            query = FindDocumentQueryMother.random(),
            document = FindDocumentQueryMother.randomDocument(query),
            expected = FindDocumentResponseMother.create(document.toPrimitives());

        repository.whenFindThenReturn(document);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
    
    it('should throw a DocumentNotFoundError when the document does not exist', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            handler = new FindDocumentQueryHandler(
                new DocumentFinder(repository)
            ),
            query = FindDocumentQueryMother.random();

        repository.whenFindThenReturn(null);

        try {
            await handler.handle(query);
        } catch (e) {
            expect(e).toBeInstanceOf(DocumentNotFoundError);
        }
    });
});
