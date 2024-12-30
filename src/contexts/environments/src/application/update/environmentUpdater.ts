import EnvironmentFinder from "@src/domain/environmentFinder";
import EnvironmentRepository from "@src/domain/environmentRepository";
import UpdateEnvironmentCommand from "./updateEnvironmentCommand";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import { CommandBus } from "@context/shared/domain/commandBus/commandBus";
import UpdateDocumentCommand from "@context/documents/application/update/updateDocumentCommand";
import SearchByEnvironmentDocumentsResponse from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsResponse";
import SearchByEnvironmentDocumentsQuery from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQuery";
import { DocumentPrimitives } from "@context/documents/domain/document";
import logger from "@context/shared/infrastructure/logger";
import EnvironmentNotFoundError from "@src/domain/errors/environmentNotFoundError";
import EnvironmentForbiddenAccess from "@src/domain/errors/environmentForbiddenAccessError";
import EnvironmentMissingParameter from "@src/domain/errors/environmentMissingParameterError";

export default class EnvironmentUpdater {
    private readonly repository: EnvironmentRepository;

    private readonly eventBus: EventBus;

    private readonly finder: EnvironmentFinder;

    private readonly queryBus: QueryBus;

    private readonly commandBus: CommandBus;

    constructor(repository: EnvironmentRepository, eventBus: EventBus, queryBus: QueryBus, commandBus: CommandBus){
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new EnvironmentFinder(repository);
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }

    async run(command: UpdateEnvironmentCommand): Promise<void>{
        const { data, permissions } = command;

        logger.info("Updating environment with ", { data });

        if(!data.id) {
            throw new EnvironmentMissingParameter();
        }
    
        if(!permissions.environmentIds.includes(data.id)) {
            new EnvironmentForbiddenAccess(data.id);
        }

        const environment = await this.finder.find(data.id);

        if(!environment) {
            throw new EnvironmentNotFoundError(data.id);
        }

        const newEnvironment = environment.update(command.data);

        const response = await this.queryBus.ask(
            new SearchByEnvironmentDocumentsQuery({
                environment: data.id
            },{
                environmentIds: permissions.environmentIds
            })
        ) as SearchByEnvironmentDocumentsResponse;

        response.documents.map(async (document: DocumentPrimitives) => {
            await this.commandBus.dispatch(
                new UpdateDocumentCommand({
                    ...document,
                    environment: newEnvironment.toPrimitives()
                },{
                    environmentIds: permissions.environmentIds
                })
            );
        });

        await this.repository.update(newEnvironment);
        
        await this.eventBus.publish(newEnvironment.pullDomainEvents());
    }
}