import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DocumentRepository from "@src/domain/documentRepository";
import UndoPushDocumentCommand from "./undoPushDocumentCommand";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery";
import SearchByEnvironmentIsDeployedDeploymentConfigsResponse from "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsResponse";
import { CommandBus } from "@context/shared/domain/commandBus/commandBus";
import UpdateDeploymentConfigsCommand from "@context/deploymentConfigs/application/update/updateDeploymentConfigsCommand";
import DocumentNotPushedError from "@src/domain/errors/documentNotPushedError";
import DocumentNotPushedDeployError from "@src/domain/errors/documentNotPushedDeployError";
import DocumentNotFoundError from "@src/domain/errors/documentNotFoundError";
import DocumentFinder from "@src/domain/documentFinder";

export default class DocumentUndoPusher {
    private readonly eventBus: EventBus;
    private readonly repository: DocumentRepository;
    private readonly queryBus: QueryBus;
    private readonly commandBus: CommandBus;
    private readonly finder: DocumentFinder;

    constructor(repository: DocumentRepository, eventBus: EventBus, queryBus: QueryBus, commandBus: CommandBus){
        this.repository = repository;
        this.eventBus = eventBus;
        this.queryBus = queryBus;
        this.commandBus = commandBus;
        this.finder = new DocumentFinder(repository);
    }

    /*
        1) Find the document with the given id
        2) Find the active deploymentConfigs for the given document (linked to an environment)
        3) Replace the current version of the document with the last one in the previous[]
        4) Remove the given document from the active deploymentConfigs
    */
    async run(command: UndoPushDocumentCommand): Promise<void>{
        const { data, permissions } = command;

        if(!data) {
            return;
        }
        
        const document = await this.finder.find(data.id, permissions.environmentIds);

        if(document === null) {
            throw new DocumentNotFoundError(data.id);
        }

        /* Get the deploymentConfigs linked to the given environmentId with attribute 'isDeployed = false' */
        const deploymentsConfigs = await this.queryBus.ask(
            new SearchByEnvironmentIsDeployedDeploymentConfigsQuery({ 
                environmentId: document.environment.id.value, 
                isDeployed: false 
            })
        ) as SearchByEnvironmentIsDeployedDeploymentConfigsResponse;

        if(deploymentsConfigs === null || deploymentsConfigs.primitives.length != 1)
            return;

        /* Find & Remove the given document from the list of documents READY to be deployed */
        const deploymentConfigs = deploymentsConfigs.primitives[0];

        /* Find the requested document within the documents[] array of the deploymentConfigs using the id */
        let index = -1;
        for(const doc of deploymentConfigs.documents) {
            if(doc.id === data.id) {
                index = deploymentConfigs.documents.indexOf(doc);
                break;
            }
        }

        /* Remove the document from the list of documents ready to be deployed (un-pushed it) */
        if (index > -1) { 
            deploymentConfigs.documents.splice(index, 1);
        }
        else throw new DocumentNotPushedDeployError(document.id.value, deploymentConfigs.id);
        
        /* Update the document */
        const newDocument = document.undoPush();
        if(newDocument === null)
            throw new DocumentNotPushedError(document.id.value);

        /* Update the deploymentConfigs */
        await this.commandBus.dispatch(
            new UpdateDeploymentConfigsCommand({
                ...deploymentConfigs
            })
        );

        await this.repository.update(newDocument);
        await this.eventBus.publish(newDocument.pullDomainEvents());
    }
}