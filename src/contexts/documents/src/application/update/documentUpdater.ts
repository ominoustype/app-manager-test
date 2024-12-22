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
        const { data, environmentIds } = command;

        if (!data.id) {
            return;
        }
        
        const document = await this.finder.find(data.id, environmentIds);

        if (document === null) {
            return;
        }

        const newDocument = document.update(command.data);

        await this.repository.update(newDocument);

        await this.eventBus.publish(newDocument.pullDomainEvents());
    }
}