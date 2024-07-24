import Document, { DocumentPrimitives } from "./document";
import DocumentMother from "./document.mother";
import DocumentRemovedDomainEvent from "./documentRemovedDomainEvent";

export default class DocumentRemovedDomainEventMother {
    static create(document: DocumentPrimitives) {
        return new DocumentRemovedDomainEvent(document);
    }

    static random() {
        return DocumentRemovedDomainEventMother.create(
            DocumentMother.random().toPrimitives()
        )
    }

    static fromDocument(document: Document) {
        return DocumentRemovedDomainEventMother.create(document.toPrimitives());
    }
}