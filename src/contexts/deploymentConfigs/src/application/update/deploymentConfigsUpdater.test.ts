import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import DeploymentConfigsRepositoryMock from "@src/__mock__/deploymentConfigsRepository";
import UpdateDeploymentConfigsCommandHandler from "./updateDeploymentConfigsCommandHandler";
import DeploymentConfigsUpdater from "./deploymentConfigsUpdater";
import UpdateDeploymentConfigsCommandMother from "./updateDeploymentConfigsCommand.mother";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";
import DeploymentConfigsUpdatedDomainEventMother from "@src/domain/deploymentConfigsUpdatedDomainEvent.mother";

describe('deploymentConfigsUpdater', () => {
    
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateDeploymentConfigsCommandHandler(
                new DeploymentConfigsUpdater(repository, eventBus)
            ),
            command = UpdateDeploymentConfigsCommandMother.random(),
            deploymentConfigs = UpdateDeploymentConfigsCommandMother.applyCommand(command),
            oldDeploymentConfigs = DeploymentConfigsMother.random(),
            expected = DeploymentConfigsMother.merge(oldDeploymentConfigs, deploymentConfigs);

        repository.whenFindThenReturn(oldDeploymentConfigs);

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected)
    });
    
    it('should publish a DeploymentConfigsUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateDeploymentConfigsCommandHandler(
                new DeploymentConfigsUpdater(repository,eventBus)
            ),
            command = UpdateDeploymentConfigsCommandMother.random(),
            deploymentConfigs = UpdateDeploymentConfigsCommandMother.applyCommand(command),
            oldDeploymentConfigs = DeploymentConfigsMother.random(),
            expected = DeploymentConfigsMother.merge(oldDeploymentConfigs, deploymentConfigs);

        repository.whenFindThenReturn(oldDeploymentConfigs);

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            DeploymentConfigsUpdatedDomainEventMother.create(
                expected.toPrimitives()
            )
        )
    });;
})