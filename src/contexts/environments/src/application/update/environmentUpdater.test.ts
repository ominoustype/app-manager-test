import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import EnvironmentRepositoryMock from "@src/__mock__/environmentRepositoryMock";
import UpdateEnvironmentCommandHandler from "./updateEnvironmentCommandHandler";
import EnvironmentUpdater from "./environmentUpdater";
import UpdateEnvironmentCommandMother from "./updateEnvironmentCommand.mother";
import EnvironmentMother from "@src/domain/environment.mother";
import EnvironmentUpdatedDomainEventMother from "@src/domain/events/environmentUpdatedDomainEvent.mother";
import QueryBusMock from "@context/shared/__mocks__/queryBus.mock";
import CommandBusMock from "@context/shared/__mocks__/commandBus.mock";
import SearchByEnvironmentDocumentsResponseMother from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsResponse.mother";

describe('environmentUpdater', () => {
    
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new UpdateEnvironmentCommandHandler(
                        new EnvironmentUpdater(repository, eventBus, queryBus, commandBus)
            ),
            command = UpdateEnvironmentCommandMother.random(),
            environment = UpdateEnvironmentCommandMother.applyCommand(command),
            oldEnvironment = EnvironmentMother.random(),
            expected = EnvironmentMother.merge(oldEnvironment, environment);

        repository.whenFindThenReturn(oldEnvironment);
        queryBus.whenAskThenReturn(
            SearchByEnvironmentDocumentsResponseMother.random()
        );

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected);
    });

    it('should publish an EnvironmentUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new UpdateEnvironmentCommandHandler(
                        new EnvironmentUpdater(repository, eventBus, queryBus, commandBus)
            ),
            command = UpdateEnvironmentCommandMother.random(),
            environment = UpdateEnvironmentCommandMother.applyCommand(command),
            oldEnvironment = EnvironmentMother.random(),
            expected = EnvironmentMother.merge(oldEnvironment, environment);
        
        repository.whenFindThenReturn(oldEnvironment);
        queryBus.whenAskThenReturn(
            SearchByEnvironmentDocumentsResponseMother.random()
        );

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            EnvironmentUpdatedDomainEventMother.create(
                expected.toPrimitives()
            )
        )
    });
});