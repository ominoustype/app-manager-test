import { Nullable } from '@context/shared/domain/nullable';
import Document from '@src/domain/document';
import Uuid from '@context/shared/domain/uuid';
import DocumentRepository from "@src/domain/documentRepository";
import { omit } from 'lodash';
import { SearchDocumentsQueryParams } from '@src/application/search/searchDocumentsQuery';
import Documents from '@src/domain/documents';

export default class DocumentRepositoryMock implements DocumentRepository {
    private mockCreate = jest.fn();
    private mockFind = jest.fn();
    private mockSearch = jest.fn();
    private mockUpdate = jest.fn();
    private mockDelete = jest.fn();

    create(document: Document) {
        return this.mockCreate(document);
    }

    assertCreateHasBeenCalledWith(document: Document, exclusions: Array<string>) {
        const { mock } = this.mockCreate,
            lastDocumentCreated = mock.calls[mock.calls.length - 1][0],
            lastDocumentCreatedPrimitives = omit(
                lastDocumentCreated.toPrimitives(),
                exclusions ?? []
            ),
            expectedBody = omit(document.toPrimitives(), exclusions ?? []);

        expect(lastDocumentCreatedPrimitives).toStrictEqual(expectedBody);
    }

    async find(id: Uuid): Promise<Nullable<Document>> {
        return this.mockFind(id);
    }

    async assertFindHasBeenCalledWith(id: Uuid): Promise<void> {
        expect(this.mockFind).toHaveBeenCalledWith(id);
    }

    async whenFindThenReturn(document: Nullable<Document>): Promise<void> {
        this.mockFind.mockReturnValue(Promise.resolve(document));
    }

    async search(params: SearchDocumentsQueryParams): Promise<[Documents, number]> {
        return this.mockSearch(params);
    }

    async assertSearchHasBeenCalledWith(params: SearchDocumentsQueryParams): Promise<void> {
        expect(this.mockSearch).toHaveBeenCalledWith(params);
    }

    async whenSearchThenReturn(documents: Documents): Promise<void> {
        this.mockSearch.mockReturnValue(documents);
    }

    update(document: Document): Promise<void> {
        return this.mockUpdate(document);
    }

    async assertUpdateHasBeenCalledWith(document: Document): Promise<void> {
        expect(this.mockUpdate).toHaveBeenCalledWith(document);
    }

    delete(document: Document): Promise<void> {
        return this.mockDelete(document);
    }

    async assertDeleteHasBeenCalledWith(document: Document): Promise<void> {
        expect(this.mockDelete).toHaveBeenCalledWith(document);
    }
}