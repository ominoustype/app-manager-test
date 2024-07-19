import { Nullable } from '@context/shared/domain/nullable';
import Document from '@src/domain/document';
import Uuid from '@context/shared/domain/uuid';
import DocumentRepository from "@src/domain/documentRepository";
import { omit } from 'lodash';

export default class DocumentRepositoryMock implements DocumentRepository {
    private mockCreate = jest.fn();
    private mockFind = jest.fn();

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
}