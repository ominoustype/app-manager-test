import Document, { DocumentPrimitives } from "./document";
import UuidMother from '@context/shared/domain/uuid.mother';

export default class DocumentMother {
    static create(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    static random(primitives: DocumentPrimitives): Document {
        return DocumentMother.create({
            id: primitives.id ? UuidMother.create(primitives.id).value : UuidMother.random().value
        })
    }
}
