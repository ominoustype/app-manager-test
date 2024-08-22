import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import RemoveDocumentsCommand from "./removeDocumentsCommand";
import DocumentFinder from "@src/domain/documentFinder";

export default class DocumentsRemover {
    private readonly repository: DocumentRepository;
    
    private readonly eventBus: EventBus;

    private readonly finder: DocumentFinder;

    constructor(repository: DocumentRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new DocumentFinder(repository);
    }

    async run(command: RemoveDocumentsCommand): Promise<void> {
        const { ids } = command;

        if(ids.length === 0) return;

        await Promise.all(
            ids.map(async (id) => {
                const document = await this.finder.find(id);

                if (document) {
                    document.delete();
            
                    await this.repository.delete(document);
            
                    await this.eventBus.publish(document.pullDomainEvents());    
                }
            })
        )

    }
}