import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import RemoveDocumentCommand from "./removeDocumentCommand";
import DocumentFinder from "@src/domain/documentFinder";

export default class DocumentRemover {
    private readonly repository: DocumentRepository;
    
    private readonly eventBus: EventBus;

    private readonly finder: DocumentFinder;

    constructor(repository: DocumentRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new DocumentFinder(repository);
    }

    async run(command: RemoveDocumentCommand): Promise<void> {
        if (!command.data.id) {
            return;
        }
        
        const document = await this.finder.find(command.data.id);

        if (document === null) {
            return;
        }

        document.delete();

        await this.repository.delete(document);

        await this.eventBus.publish(document.pullDomainEvents());
    }
}