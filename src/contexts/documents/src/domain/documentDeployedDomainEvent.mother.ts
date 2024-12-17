import Document, { DocumentPrimitives } from "./document";
import DocumentMother from "./document.mother";
import DocumentDeployedDomainEvent from "./documentDeployedDomainEvent";

export default class DocumentDeployedDomainEventMother {
    static create(document: DocumentPrimitives) {
        return new DocumentDeployedDomainEvent(document);
    }

    static random() {
        return DocumentDeployedDomainEventMother.create(
            DocumentMother.random().toPrimitives()
        )
    }

    static fromDocument(document: Document) {
        return DocumentDeployedDomainEventMother.create(document.toPrimitives());
    }
}