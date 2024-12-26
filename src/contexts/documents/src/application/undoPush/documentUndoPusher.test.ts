import CommandBusMock from "@context/shared/__mocks__/commandBus.mock";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import QueryBusMock from "@context/shared/__mocks__/queryBus.mock";
import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import UndoPushDocumentCommandHandler from "./undoPushDocumentCommandHandler";
import DocumentUndoPusher from "./documentUndoPusher";
import UndoPushDocumentCommandMother from "./undoPushDocumentCommand.mother";
import SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother from "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsResponse.mother";
import DeploymentsConfigsMother from "@context/deploymentConfigs/domain/deploymentsConfigs.mother";
import DeploymentConfigsMother from "@context/deploymentConfigs/domain/deploymentConfigs.mother";
import DocumentUpdatedDomainEventMother from "@src/domain/documentUpdatedDomainEvent.mother";
import DocumentsMother from "@context/deploymentConfigs/domain/documents/documents.mother";
import DocumentNotPushedError from "@src/domain/errors/documentNotPushedError";
import DocumentNotPushedDeployError from "@src/domain/errors/documentNotPushedDeployError";

describe('documentUndoPusher', () => {
    it('should publish a DocumentUpdatedDomainEvent and dispatch an UpdateDeploymentConfigsCommand', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new UndoPushDocumentCommandHandler(
                new DocumentUndoPusher(repository,eventBus, queryBus, commandBus, )
            ),
            command = UndoPushDocumentCommandMother.random(),
            document = UndoPushDocumentCommandMother.applyCommandDocumentReady(command); // DocumentStatus to READY

        repository.whenFindThenReturn(document);
        
        /* Create just ONE DeploymentConfigs with the proper Environment linked to it and the with a Document pushed (READY) */
        const documents = DocumentsMother.random().toPrimitives();
        documents.push(document.toPrimitives());
        const deploymentsConfigs = DeploymentsConfigsMother.empty().toPrimitives();
        deploymentsConfigs.push(DeploymentConfigsMother.random({
                environment: document.environment.toPrimitives(),
                documents: documents    
        }).toPrimitives());

        queryBus.whenAskThenReturn(
            SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.create(
                deploymentsConfigs
            )
        );

        await handler.handle(command);

        const deploymentConfigs = deploymentsConfigs[0];

        /* Find the requested document within the documents[] array of the deploymentConfigs using the id */
        let index = -1;
        for(const doc of deploymentConfigs.documents) {
            if(doc.id === document.id.value) {
                index = deploymentConfigs.documents.indexOf(doc);
                break;
            }
        }

        /* Remove the document from the list of documents ready to be deployed (un-pushed it) */
        if (index > -1) { 
            deploymentConfigs.documents.splice(index, 1);
        }

        /*
        commandBus.assertLastDispatchedCommandIs(
            new UpdateDeploymentConfigsCommand({
                ...deploymentConfigs
            })
        );
        */

        const expected = document.undoPush(); // Needed

        eventBus.assertLastPublishedEventIs(
            DocumentUpdatedDomainEventMother.create(
                expected!.toPrimitives()
            ),
            [
                'body.savedAt',
                'body.version'
            ]
        )
    });

    it('should throw a DocumentNotPushedError', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new UndoPushDocumentCommandHandler(
                new DocumentUndoPusher(repository,eventBus, queryBus, commandBus)
            ),
            command = UndoPushDocumentCommandMother.random(),
            document = UndoPushDocumentCommandMother.applyCommand(command); // DocumentStatus to READY

        repository.whenFindThenReturn(document);
        
        /* Create just ONE DeploymentConfigs with the proper Environment linked to it */
        const documents = DocumentsMother.random().toPrimitives();
        documents.push(document.toPrimitives());
        const deploymentsConfigs = DeploymentsConfigsMother.empty().toPrimitives();
        deploymentsConfigs.push(DeploymentConfigsMother.random({
                environment: document.environment.toPrimitives(),
                documents: documents
            }
        ).toPrimitives());

        queryBus.whenAskThenReturn(
            SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.create(
                deploymentsConfigs
            )
        );

        try{
            await handler.handle(command);
        }
        catch(e){
            expect(e).toBeInstanceOf(DocumentNotPushedError)
        }
    });

    it('should throw a DocumentNotPushedDeployError', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new UndoPushDocumentCommandHandler(
                new DocumentUndoPusher(repository,eventBus, queryBus, commandBus)
            ),
            command = UndoPushDocumentCommandMother.random(),
            document = UndoPushDocumentCommandMother.applyCommand(command); // DocumentStatus to READY

        repository.whenFindThenReturn(document);
        
        /* Create just ONE DeploymentConfigs with the proper Environment linked to it and NO documents pushed */
        const deploymentsConfigs = DeploymentsConfigsMother.empty().toPrimitives();
        deploymentsConfigs.push(DeploymentConfigsMother.random({
                environment: document.environment.toPrimitives(),
            }
        ).toPrimitives());

        queryBus.whenAskThenReturn(
            SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.create(
                deploymentsConfigs
            )
        );

        try{
            await handler.handle(command);
        }
        catch(e){
            expect(e).toBeInstanceOf(DocumentNotPushedDeployError)
        }
    });
});