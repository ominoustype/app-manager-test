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

        if(!data.id)
            return;
    
        if(!permissions.environmentIds.includes(data.id)) {
            return;
        }

        const environment = await this.finder.find(data.id);

        if(environment === null)
            return;

        const newEnvironment = environment.update(command.data);

        const response = await this.queryBus.ask(
            new SearchByEnvironmentDocumentsQuery({
                environment: data.id
            },
            {
                environmentIds: permissions.environmentIds
            })
        )  as SearchByEnvironmentDocumentsResponse;

        response.documents.map(async (document: DocumentPrimitives) => {
            await this.commandBus.dispatch(
                new UpdateDocumentCommand({
                    ...document,
                    environment: newEnvironment.toPrimitives()
                },
                {
                    environmentIds: permissions.environmentIds
                })
            );
        });

        await this.repository.update(newEnvironment);
        
        await this.eventBus.publish(newEnvironment.pullDomainEvents());
    }
}