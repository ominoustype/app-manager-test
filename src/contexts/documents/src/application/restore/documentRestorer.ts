import DocumentFinder from "@src/domain/documentFinder";
import DocumentRepository from "@src/domain/documentRepository";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import RestoreDocumentCommand from "./restoreDocumentCommand";
import DocumentVersionNotFoundError from "@src/domain/errors/documentVersionNotFoundError";

export default class DocumentRestorer {
    private readonly documentFinder: DocumentFinder;

    private readonly eventBus: EventBus;

    private readonly repository: DocumentRepository;

    constructor( repository: DocumentRepository, eventBus: EventBus) {
        this.eventBus = eventBus;
        this.repository = repository;
        this.documentFinder = new DocumentFinder(repository);
    }

    async run(command: RestoreDocumentCommand): Promise<void> {
        const { id, version } = command.data,
            enviromentIds = command.environmentIds;


        if (!id || !version) {
            return;
        }

        const document = await this.documentFinder.find(id, enviromentIds);

        if (document === null) {
            return;
        }

        const restoredDocument = document.restore(version);

        if(restoredDocument === null)
            throw new DocumentVersionNotFoundError(id, version);

        await this.repository.update(restoredDocument);

        await this.eventBus.publish(restoredDocument.pullDomainEvents());
    }
}