import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import EnvironmentRepositoryMock from "@src/__mock__/environmentRepositoryMock";
import RemoveEnvironmentCommandHandler from "./removeEnvironmentCommandHandler";
import RemoveEnvironmentCommandMother from "./removeEnvironmentCommand.mother";
import EnvironmentRemover from "./environmentRemover";
import EnvironmentRemovedDomainEventMother from "@src/domain/events/environmentRemovedDomainEvent.mother";

describe('environmentRemover', () => {

    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
        eventBus = new EventBusMock(),
        handler = new RemoveEnvironmentCommandHandler(
                        new EnvironmentRemover(repository, eventBus)
        ),
        command = RemoveEnvironmentCommandMother.random(),
        environment = RemoveEnvironmentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(environment);

        await handler.handle(command);

        repository.assertDeleteHasBeenCalledWith(environment);
    });

    it('should publish an EnvironmentRemovedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
        eventBus = new EventBusMock(),
        handler = new RemoveEnvironmentCommandHandler(
                        new EnvironmentRemover(repository, eventBus)
        ),
        command = RemoveEnvironmentCommandMother.random(),
        environment = RemoveEnvironmentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(environment);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            EnvironmentRemovedDomainEventMother.fromEnvironment(
                RemoveEnvironmentCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.id'
            ]
        );
    });
});