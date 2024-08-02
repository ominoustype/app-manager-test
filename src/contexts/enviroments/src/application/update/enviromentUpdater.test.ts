import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import EnviromentRepositoryMock from "@src/__mock__/enviromentRepositoryMock";
import UpdateEnviromentCommandHandler from "./updateEnviromentCommandHandler";
import EnviromentUpdater from "./enviromentUpdater";
import UpdateEnviromentCommandMother from "./updateEnviromentCommand.mother";
import EnviromentMother from "@src/domain/enviroment.mother";
import EnviromentUpdatedDomainEventMother from "@src/domain/enviromentUpdatedDomainEvent.mother";

describe('enviromentUpdater', () => {
    
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new UpdateEnviromentCommandHandler(
                        new EnviromentUpdater(repository, eventBus));

        const command = UpdateEnviromentCommandMother.random();
        const enviroment = UpdateEnviromentCommandMother.applyCommand(command);

        const oldEnviroment = EnviromentMother.random();
        const expected = EnviromentMother.merge(oldEnviroment, enviroment);

        repository.whenFindThenReturn(oldEnviroment);

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected);
    });

    it('should publish an EnviromentUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new UpdateEnviromentCommandHandler(
                        new EnviromentUpdater(repository, eventBus));

        const command = UpdateEnviromentCommandMother.random();
        const enviroment = UpdateEnviromentCommandMother.applyCommand(command);

        const oldEnviroment = EnviromentMother.random();
        const expected = EnviromentMother.merge(oldEnviroment, enviroment);
        
        repository.whenFindThenReturn(oldEnviroment);

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            EnviromentUpdatedDomainEventMother.create(
                expected.toPrimitives()
            )
        )
    });
});