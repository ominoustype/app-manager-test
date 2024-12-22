import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import DocumentFinder from "@src/domain/documentFinder";
import PushDocumentCommand from "./pushDocumentCommand";
import { CommandBus } from "@context/shared/domain/commandBus/commandBus";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import CreateDeploymentConfigsCommand from "@context/deploymentConfigs/application/create/createDeploymentConfigsCommand";
import UpdateDeploymentConfigsCommand from "@context/deploymentConfigs/application/update/updateDeploymentConfigsCommand";
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery";
import SearchByEnvironmentIsDeployedDeploymentConfigsResponse from "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsResponse";
import { DocumentPrimitives } from "@context/deploymentConfigs/domain/documents/document";
import DocumentStatus from "@src/domain/documentStatus";
import MultipleDeploymentConfigsFoundError from "@src/domain/errors/multipleDeploymentConfigsFoundError";
import DocumentAlreadyPushedError from "@src/domain/errors/documentAlreadyPushedError";
export default class DocumentPusher {
    private readonly repository: DocumentRepository;
    
    private readonly eventBus: EventBus;

    private readonly finder: DocumentFinder;

    private readonly commandBus: CommandBus;

    private readonly queryBus: QueryBus;

    constructor(repository: DocumentRepository, eventBus: EventBus, commandBus: CommandBus, queryBus: QueryBus) {
        this.repository = repository;
        this.eventBus = eventBus;
        this.finder = new DocumentFinder(repository);
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }

    async run(command: PushDocumentCommand): Promise<void> {
        const { data, permissions } = command;

        if (!data.id) {
            return;
        }
        
        const document = await this.finder.find(data.id, permissions.environmentIds);

        if (document === null) {
            return;
        }

        // TODO give it a second thought
        const documentPrimitives = document.toPrimitives();
        documentPrimitives.status = DocumentStatus.READY;
        // TODO secure+ check if the first element of previous is READY

        /* Get the deploymentConfigs linked to the given environmentId with attribute 'isDeployed = false' */
        const deploymentsConfigs = await this.queryBus.ask(
            new SearchByEnvironmentIsDeployedDeploymentConfigsQuery({ 
                environmentId: document.environment.id.value, 
                isDeployed: false 
            })) as SearchByEnvironmentIsDeployedDeploymentConfigsResponse;

        if(deploymentsConfigs === null )
            return;

        const deploymentsConfigsPrimitives = deploymentsConfigs.primitives;

        /* If the deploymentConfigs does not exist -> create one
        Otherwise, update it with the given document */
        const deploysFound = deploymentsConfigsPrimitives.length;
        if(deploysFound == 0) {
            /* Create a new deploymentConfigs linked to the given environment */
            await this.commandBus.dispatch(
                new CreateDeploymentConfigsCommand({
                    environment: document.environment.toPrimitives(),
                    customer: document.customer.toPrimitives(), 
                    documents: new Array<DocumentPrimitives>(documentPrimitives)
                }));
        }
        else {
            if(deploysFound == 1) {
                const deploymentConfigs = deploymentsConfigsPrimitives[0];

                /* Check if there are any versions of the given document already pushed */
                let alreadyPushed = false;
                deploymentConfigs.documents.map((document) => {
                    if(document.id == command.data.id){
                        alreadyPushed = true;
                    }
                });
    
                if(alreadyPushed){
                    throw new DocumentAlreadyPushedError(document.id.value);
                }
                deploymentConfigs.documents.push(documentPrimitives);

                /* Update the deploymentConfigs with the given document READY to be deployed */
                await this.commandBus.dispatch(
                    new UpdateDeploymentConfigsCommand({
                        ...deploymentConfigs
                    }));
            }
            else{
                throw new MultipleDeploymentConfigsFoundError(document.environment.id.value);
            }
        }

        /* Update the given document */
        const newDocument = document.push();

        await this.repository.update(newDocument);

        await this.eventBus.publish(newDocument.pullDomainEvents());
    }
}
