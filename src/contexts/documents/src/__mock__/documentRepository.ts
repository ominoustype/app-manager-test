import { Nullable } from '@context/shared/domain/nullable';
import Document from '@src/domain/document';
import Uuid from '@context/shared/domain/uuid';
import DocumentRepository from "@src/domain/documentRepository";

export default class DocumentRepositoryMock implements DocumentRepository {
    private mockFind = jest.fn();

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