import Document, { DocumentPrimitives } from "./document";
import UuidMother from '@context/shared/domain/uuid.mother';
import DatetimeMother from "@context/shared/domain/datetime.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class DocumentMother {
    static create(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    static random(primitives?: Partial<DocumentPrimitives>): Document {
        return DocumentMother.create({
            id: UuidMother.random().value,
            created_at: DatetimeMother.random().toString(),
            name: MotherCreator.words().toString(),
            type: MotherCreator.words().toString(),
            version: MotherCreator.words().toString(),
            properties: MotherCreator.words().toString(),
            customerId: UuidMother.random().value,
            environmentId: UuidMother.random().value,
            updatedBy: MotherCreator.words().toString(),
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

    static merge(oldDocument: Document, newDocument: Document) {
        return DocumentMother.create({
            ...oldDocument.merge(newDocument.toPrimitives())
        });
    }
}
