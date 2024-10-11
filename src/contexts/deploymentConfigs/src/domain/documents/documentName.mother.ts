import MotherCreator from "@context/shared/domain/motherCreator.mother";
import DocumentName from "./documentName";

export default class DocumentNameMother {
    static create(value: string) {
        return new DocumentName(value);
    }

    static random() {
        return DocumentNameMother.create(MotherCreator.word())
    }
}
