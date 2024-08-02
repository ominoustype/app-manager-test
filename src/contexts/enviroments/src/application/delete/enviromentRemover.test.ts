import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import EnviromentRepositoryMock from "@src/__mock__/enviromentRepositoryMock";
import RemoveEnviromentCommandHandler from "./removeEnviromentCommandHandler";
import RemoveEnviromentCommandMother from "./removeEnviromentCommand.mother";
import EnviromentRemover from "./enviromentRemover";
import EnviromentRemovedDomainEventMother from "@src/domain/enviromentRemovedDomainEvent.mother";

describe('enviromentRemover', () => {

    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new RemoveEnviromentCommandHandler(
                        new EnviromentRemover(repository, eventBus)
        );

        const command = RemoveEnviromentCommandMother.random();
        const enviroment = RemoveEnviromentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(enviroment);

        await handler.handle(command);

        repository.assertDeleteHasBeenCalledWith(enviroment);
    });

    it('should publish an EnviromentRemovedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new RemoveEnviromentCommandHandler(
                        new EnviromentRemover(repository, eventBus)
        );

        const command = RemoveEnviromentCommandMother.random();
        const enviroment = RemoveEnviromentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(enviroment);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            EnviromentRemovedDomainEventMother.fromEnviroment(
                RemoveEnviromentCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.id'
            ]
        );
    });
});