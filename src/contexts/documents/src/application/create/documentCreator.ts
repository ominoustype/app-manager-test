import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import CreateDocumentCommand from "./createDocumentCommand";
import Document from "@src/domain/document";

export default class DocumentCreator {
    private readonly repository: DocumentRepository;
    
    private readonly eventBus: EventBus;

    constructor(repository: DocumentRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(command: CreateDocumentCommand): Promise<void> {
        const newDocument = Document.create(command.data);

        await this.repository.create(newDocument);

        await this.eventBus.publish(newDocument.pullDomainEvents());
    }
}