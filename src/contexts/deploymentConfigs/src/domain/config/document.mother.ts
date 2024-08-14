import Repeater from "@context/shared/domain/repeater.mother";
import Document, { DocumentPrimitives } from "./document";
import MotherCreator from "@context/shared/domain/motherCreator.mother";

export default class DocumentMother {
    static create(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    static random(primitives?: Partial<DocumentPrimitives>): Document {
        return DocumentMother.create({
            version: MotherCreator.words(),
            path: MotherCreator.words(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            DocumentMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            DocumentMother.random,
            size
        );
    }
}