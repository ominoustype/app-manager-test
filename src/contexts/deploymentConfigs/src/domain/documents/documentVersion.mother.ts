import MotherCreator from "@context/shared/domain/motherCreator.mother";
import DocumentVersion from "./documentVersion";

export default class DocumentVersionMother {
    static create(value: string) {
        return new DocumentVersion(value);
    }

    static random() {
        return DocumentVersionMother.create(MotherCreator.word())
    }
}
