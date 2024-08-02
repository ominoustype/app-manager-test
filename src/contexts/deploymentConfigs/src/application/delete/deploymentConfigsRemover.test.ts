import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import DeploymentConfigsRepositoryMock from "@src/__mock__/deploymentConfigsRepository";
import RemoveDeploymentConfigsCommandHandler from "./removeDeploymentConfigsCommandHandler";
import RemoveDeploymentConfigsCommandMother from "./removeDeploymentConfigsCommand.mother";
import DeploymentConfigsRemovedDomainEventMother from "@src/domain/deploymentConfigsRemovedDomainEvent.mother";
import DeploymentConfigsRemover from "./deploymentConfigsRemover";

describe('deploymentConfigsRemover', () => {

    it('should call the repository with the correct parameters', async () => {
        //expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new RemoveDeploymentConfigsCommandHandler(
                        new DeploymentConfigsRemover(repository, eventBus)
        );

        const command = RemoveDeploymentConfigsCommandMother.random();
        const deploymentConfigs = RemoveDeploymentConfigsCommandMother.applyCommand(command);

        repository.whenFindThenReturn(deploymentConfigs);

        await handler.handle(command);

        repository.assertDeleteHasBeenCalledWith(deploymentConfigs);
    });

    it('should publish a deploymentConfigsRemovedDomainEvent', async () => {
        //expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new RemoveDeploymentConfigsCommandHandler(
                        new DeploymentConfigsRemover(repository, eventBus)
        );

        const command = RemoveDeploymentConfigsCommandMother.random();
        const deploymentConfigs = RemoveDeploymentConfigsCommandMother.applyCommand(command);

        repository.whenFindThenReturn(deploymentConfigs);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            DeploymentConfigsRemovedDomainEventMother.fromDeploymentConfigs(
                RemoveDeploymentConfigsCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.id'
            ]
        )
    });
});