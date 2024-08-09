import UuidMother from "@context/shared/domain/uuid.mother";
import DocumentId from "./documentId";

export default class DocumentIdMother {
    static create(value: string) {
        return new DocumentId(value);
    }

    static random() {
        return DocumentIdMother.create(UuidMother.random().value)
    }
}
