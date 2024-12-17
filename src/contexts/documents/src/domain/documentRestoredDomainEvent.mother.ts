import Document, { DocumentPrimitives } from "./document";
import DocumentMother from "./document.mother";
import DocumentRestoredDomainEvent from "./documentRestoredDomainEvent";

export default class DocumentRestoredDomainEventMother {
    static create(document: DocumentPrimitives) {
        return new DocumentRestoredDomainEvent(document);
    }

    static random() {
        return DocumentRestoredDomainEventMother.create(
            DocumentMother.random().toPrimitives()
        )
    }

    static fromDocument(document: Document) {
        return DocumentRestoredDomainEventMother.create(document.toPrimitives());
    }
}