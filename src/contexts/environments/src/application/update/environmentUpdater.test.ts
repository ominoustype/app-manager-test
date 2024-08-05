import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import EnvironmentRepositoryMock from "@src/__mock__/environmentRepositoryMock";
import UpdateEnvironmentCommandHandler from "./updateEnvironmentCommandHandler";
import EnvironmentUpdater from "./environmentUpdater";
import UpdateEnvironmentCommandMother from "./updateEnvironmentCommand.mother";
import EnvironmentMother from "@src/domain/environment.mother";
import EnvironmentUpdatedDomainEventMother from "@src/domain/environmentUpdatedDomainEvent.mother";

describe('environmentUpdater', () => {
    
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new UpdateEnvironmentCommandHandler(
                        new EnvironmentUpdater(repository, eventBus));

        const command = UpdateEnvironmentCommandMother.random();
        const environment = UpdateEnvironmentCommandMother.applyCommand(command);

        const oldEnvironment = EnvironmentMother.random();
        const expected = EnvironmentMother.merge(oldEnvironment, environment);

        repository.whenFindThenReturn(oldEnvironment);

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected);
    });

    it('should publish an EnvironmentUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new UpdateEnvironmentCommandHandler(
                        new EnvironmentUpdater(repository, eventBus));

        const command = UpdateEnvironmentCommandMother.random();
        const environment = UpdateEnvironmentCommandMother.applyCommand(command);

        const oldEnvironment = EnvironmentMother.random();
        const expected = EnvironmentMother.merge(oldEnvironment, environment);
        
        repository.whenFindThenReturn(oldEnvironment);

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            EnvironmentUpdatedDomainEventMother.create(
                expected.toPrimitives()
            )
        )
    });
});