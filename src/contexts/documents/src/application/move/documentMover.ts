import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import MoveDocumentCommand from "./moveDocumentCommand";
import DocumentFinder from "@src/domain/documentFinder";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import FindEnvironmentQuery from "@context/environments/application/find/findEnvironmentQuery";
import EnvironmentResponse from "@context/environments/application/find/findEnvironmentResponse";

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
        const { documentId, newEnvironmentId } = command;

        if (!documentId) {
            return;
        }
        
        const document = await this.finder.find(documentId);

        if (document === null) {
            return;
        }

/*        if (document.status !== DRAFT) {
            //status: DRAFT | READY | DEPLOYED | DELETED
            throw Error
        }
*/
        const environment = await this.queryBus.ask(
            new FindEnvironmentQuery({ id: newEnvironmentId })
        ) as unknown as EnvironmentResponse;

        const newDocument = document.move(environment.primitives);

        await this.repository.update(newDocument);

        await this.eventBus.publish(newDocument.pullDomainEvents());
    }
}