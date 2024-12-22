import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import MoveDocumentCommand from "./moveDocumentCommand";
import DocumentFinder from "@src/domain/documentFinder";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import FindEnvironmentQuery from "@context/environments/application/find/findEnvironmentQuery";
import EnvironmentResponse from "@context/environments/application/find/findEnvironmentResponse";
import DocumentPreviousReadyError from "@src/domain/errors/documentPreviousReadyError";
export default class DocumentMover {
    private readonly repository: DocumentRepository;
    
    private readonly eventBus: EventBus;

    private readonly queryBus: QueryBus;

    private readonly finder: DocumentFinder;

    constructor(repository: DocumentRepository, eventBus: EventBus, queryBus: QueryBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new DocumentFinder(repository);
        this.queryBus = queryBus;
    }

    async run(command: MoveDocumentCommand): Promise<void> {
        const { documentId, newEnvironmentId, environmentIds } = command;

        if (!documentId) {
            return;
        }
        
        const document = await this.finder.find(documentId, environmentIds);

        if (document === null) {
            return;
        }

        if(!environmentIds.includes(newEnvironmentId)) {
            return;
        }

        const environment = await this.queryBus.ask(
            new FindEnvironmentQuery({ id: newEnvironmentId })
        ) as EnvironmentResponse;

        const newDocument = document.move(environment.primitives);
        if (newDocument === null) {
            throw new DocumentPreviousReadyError(documentId, newEnvironmentId);
        }

        await this.repository.update(newDocument);

        await this.eventBus.publish(newDocument.pullDomainEvents());
    }
}