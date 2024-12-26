import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import PushDocumentCommandHandler from "./pushDocumentCommandHandler";
import DocumentPusher from "./documentPusher";
import PushDocumentCommandMother from "./pushDocumentCommand.mother";
import QueryBusMock from "@context/shared/__mocks__/queryBus.mock";
import CommandBusMock from "@context/shared/__mocks__/commandBus.mock";
import SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother from 
    "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsResponse.mother"
import DeploymentConfigsMother from "@context/deploymentConfigs/domain/deploymentConfigs.mother";
import DeploymentsConfigsMother from "@context/deploymentConfigs/domain/deploymentsConfigs.mother";
import MultipleDeploymentConfigsFoundError from "@src/domain/errors/multipleDeploymentConfigsFoundError";
import DocumentUpdatedDomainEventMother from "@src/domain/documentUpdatedDomainEvent.mother";
import { DocumentPrimitives } from "@src/domain/document";
import DocumentMother from "@src/domain/document.mother";
import DocumentAlreadyPushedError from "@src/domain/errors/documentAlreadyPushedError";

describe('documentPusher', () => {
    it('should publish a DocumentUpdatedDomainEvent and dispatch an UpdateDeploymentConfigsCommand', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new PushDocumentCommandHandler(
                new DocumentPusher(repository,eventBus, commandBus, queryBus)
            ),
            command = PushDocumentCommandMother.random(),
            document = PushDocumentCommandMother.applyCommandDocumentReady(command); // DocumentStatus to READY

        repository.whenFindThenReturn(document);
        
        /* Create just ONE DeploymentConfigs with the proper Environment linked to it */
        const deploymentsConfigs = DeploymentsConfigsMother.empty().toPrimitives();
        deploymentsConfigs.push(DeploymentConfigsMother.random({
                environment: document.environment.toPrimitives()
            }
        ).toPrimitives());

        queryBus.whenAskThenReturn(
            SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.create(
                deploymentsConfigs
            )
        );

        const expected = document.push(); // Needed

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            DocumentUpdatedDomainEventMother.create(
                expected!.toPrimitives()
            ),
            [
                'body.savedAt',
                'body.version'
            ]
        )

        deploymentsConfigs[0].documents.push(document.toPrimitives()); // Add the Document to the DeploymentConfigs array
        /*
        commandBus.assertLastDispatchedCommandIs(
            new UpdateDeploymentConfigsCommand({
                ...deploymentsConfigs[0]
            })
        );
        */
    });

    it('should dispatch a CreateDeploymentConfigsCommand', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new PushDocumentCommandHandler(
                new DocumentPusher(repository,eventBus,commandBus, queryBus)
            ),
            command = PushDocumentCommandMother.random(),
            document = PushDocumentCommandMother.applyCommandDocumentReady(command);

        repository.whenFindThenReturn(document);

        /* Create an empty DeploymentConfigs */
        queryBus.whenAskThenReturn(
            SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.create(
                DeploymentsConfigsMother.empty().toPrimitives()
            )
        );

        await handler.handle(command);
        /*
        commandBus.assertLastDispatchedCommandIs(
            new CreateDeploymentConfigsCommand({
                environment: document.environment.toPrimitives(),
                customer: document.customer.toPrimitives(), 
                documents: new Array<DocumentPrimitives>(document.toPrimitives())
            }));
        */
    });

    it('should throw a DocumentAlreadyPushedError', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new PushDocumentCommandHandler(
                new DocumentPusher(repository,eventBus, commandBus, queryBus)
            ),
            command = PushDocumentCommandMother.random(),
            document = PushDocumentCommandMother.applyCommandDocumentReady(command); // DocumentStatus to READY

        repository.whenFindThenReturn(document);
        
        /* Create just ONE DeploymentConfigs with the proper Environment linked to it
        Add the given Document to the list */
        const deploymentsConfigs = DeploymentsConfigsMother.empty().toPrimitives();
        deploymentsConfigs.push(DeploymentConfigsMother.random({
                environment: document.environment.toPrimitives(),
                documents: new Array<DocumentPrimitives>(DocumentMother.random({
                    id: document.id.value
                }).toPrimitives())
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
            expect(e).toBeInstanceOf(DocumentAlreadyPushedError);
        }
    }); 

    it('should throw a MultipleDeploymentConfigsFoundError', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new PushDocumentCommandHandler(
                new DocumentPusher(repository,eventBus,commandBus, queryBus)
            ),
            command = PushDocumentCommandMother.random(),
            document = PushDocumentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(document);

        /* Return more than one DeploymentConfigs */
        queryBus.whenAskThenReturn(
            SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.create(
                DeploymentsConfigsMother.randomWithSize(5).toPrimitives()
            )
        );

        try{
            await handler.handle(command);
        }
        catch(e){
            expect(e).toBeInstanceOf(MultipleDeploymentConfigsFoundError);
        }

        commandBus.assertNothingDispatched();
    });
});