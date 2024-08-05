import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import DeploymentConfigsRepositoryMock from "@src/__mock__/deploymentConfigsRepository";
import CreateDeploymentConfigsCommandHandler from "./createDeploymentConfigsCommandHandler";
import DeploymentConfigsCreator from "./deploymentConfigsCreator";
import CreateDeploymentConfigsCommandMother from "./createDeploymentConfigsCommand.mother";
import NewDeploymentConfigsCreatedDomainEventMother from "@src/domain/newDeploymentConfigsCreatedDomainEvent.mother";
import DeploymentConfigsAlreadyExistsError from "@src/domain/errors/deploymentConfigsAlreadyExistsError";

describe('deploymentConfigsCreator', () => {

    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new CreateDeploymentConfigsCommandHandler(
                        new DeploymentConfigsCreator(repository, eventBus)
        );
        const command = CreateDeploymentConfigsCommandMother.random();

        repository.whenFindThenReturn(null);
        
        await handler.handle(command);

        repository.assertCreateHasBeenCalledWith(
            CreateDeploymentConfigsCommandMother.applyCommand(command),
            ['id']
        );
    });

    it('should throw a DeploymentConfigsAlreadyExistsError', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateDeploymentConfigsCommandHandler(
                new DeploymentConfigsCreator(repository,eventBus)
            ),
            command = CreateDeploymentConfigsCommandMother.random(),
            deploymentConfigs = CreateDeploymentConfigsCommandMother.applyCommand(command);

        try{     
            repository.whenFindThenReturn(deploymentConfigs);

            await handler.handle(command);
        } catch (e) {
            expect(e).toBeInstanceOf(DeploymentConfigsAlreadyExistsError);
        }
    });

    it('should publish a NewDeploymentConfigsCreatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new CreateDeploymentConfigsCommandHandler(
                        new DeploymentConfigsCreator(repository, eventBus)
        );
        const command = CreateDeploymentConfigsCommandMother.random();
        
        repository.whenFindThenReturn(null);
        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            NewDeploymentConfigsCreatedDomainEventMother.fromDeploymentConfigs(
                CreateDeploymentConfigsCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.id'
            ]
        )
    });
});