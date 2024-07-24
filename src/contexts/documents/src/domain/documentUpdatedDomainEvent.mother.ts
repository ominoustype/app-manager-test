import Document, { DocumentPrimitives } from "./document";
import DocumentMother from "./document.mother";
import DocumentUpdatedDomainEvent from "./documentUpdatedDomainEvent";

export default class DocumentUpdatedDomainEventMother {
    static create(document: DocumentPrimitives) {
        return new DocumentUpdatedDomainEvent(document);
    }

    static random() {
        return DocumentUpdatedDomainEventMother.create(
            DocumentMother.random().toPrimitives()
        )
    }

    static fromDocument(document: Document) {
        return DocumentUpdatedDomainEventMother.create(document.toPrimitives());
    }
}