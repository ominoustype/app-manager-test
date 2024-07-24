import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import UpdateDocumentCommand from "./updateDocumentCommand";
import DocumentFinder from "@src/domain/documentFinder";

export default class DocumentUpdater {
    private readonly repository: DocumentRepository;
    
    private readonly eventBus: EventBus;

    private readonly finder: DocumentFinder;

    constructor(repository: DocumentRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new DocumentFinder(repository);
    }

    async run(command: UpdateDocumentCommand): Promise<void> {
        if (!command.data.id) {
            return;
        }
        
        const document = await this.finder.find(command.data.id);

        if (document === null) {
            return;
        }

        const newDocument = document.update(command.data);

        await this.repository.update(newDocument);

        await this.eventBus.publish(newDocument.pullDomainEvents());
    }
}