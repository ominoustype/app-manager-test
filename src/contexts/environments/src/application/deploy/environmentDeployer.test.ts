import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import EnvironmentRepositoryMock from "@src/__mock__/environmentRepositoryMock";
import DeployEnvironmentCommandHandler from "./deployEnvironmentCommandHandler";
import EnvironmentDeployer from "./environmentDeployer";
import DeployEnvironmentCommandMother from "./deployEnvironmentCommand.mother";
import EnvironmentMother from "@src/domain/environment.mother";
import EnvironmentUpdatedDomainEventMother from "@src/domain/events/environmentUpdatedDomainEvent.mother";

describe('environmentDeployer', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new DeployEnvironmentCommandHandler(
                        new EnvironmentDeployer(repository, eventBus)
            ),
            command = DeployEnvironmentCommandMother.random(),
            { environment, deploymentConfigsId }= DeployEnvironmentCommandMother.applyCommand(command),
            oldEnvironment = EnvironmentMother.random(),
            expected = oldEnvironment.deploy(environment.toPrimitives(), deploymentConfigsId);

        repository.whenFindThenReturn(oldEnvironment);

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected);
    });

    it('should publish an EnvironmentUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new DeployEnvironmentCommandHandler(
                        new EnvironmentDeployer(repository, eventBus)
            ),
            command = DeployEnvironmentCommandMother.random(),
            { environment, deploymentConfigsId } = DeployEnvironmentCommandMother.applyCommand(command),
            oldEnvironment = EnvironmentMother.random(),
            expected = oldEnvironment.deploy(environment.toPrimitives(), deploymentConfigsId);
        
        repository.whenFindThenReturn(oldEnvironment);
        
        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            EnvironmentUpdatedDomainEventMother.create(
                expected.toPrimitives()
            ),
            [
                'body.prevDeploys'
            ]
        )
    });
});