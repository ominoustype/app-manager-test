import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import CreateDocumentCommand from "./createDocumentCommand";
import Document from "@src/domain/document";
import DocumentAlreadyExistsError from "@src/domain/errors/documentAlreadyExistsError";

export default class DocumentCreator {
    private readonly repository: DocumentRepository;
    
    private readonly eventBus: EventBus;

    constructor(repository: DocumentRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(command: CreateDocumentCommand): Promise<void> {
        const newDocument = Document.create(command.data);

        const document = await this.repository.find(newDocument.id);

        if (document !== null) {
            throw new DocumentAlreadyExistsError(newDocument.id.value)
        }

        await this.repository.create(newDocument);

        await this.eventBus.publish(newDocument.pullDomainEvents());
    }
}