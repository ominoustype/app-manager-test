import Document, { DocumentPrimitives } from "./document";
import DocumentMother from "./document.mother";
import NewDocumentCreatedDomainEvent from "./newDocumentCreatedDomainEvent";

export default class NewDocumentCreatedDomainEventMother {
    static create(document: DocumentPrimitives) {
        return new NewDocumentCreatedDomainEvent(document);
    }

    static random() {
        return NewDocumentCreatedDomainEventMother.create(
            DocumentMother.random().toPrimitives()
        )
    }

    static fromDocument(document: Document) {
        return NewDocumentCreatedDomainEventMother.create(document.toPrimitives());
    }
}