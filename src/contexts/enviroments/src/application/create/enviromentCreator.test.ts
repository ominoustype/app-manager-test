import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import EnviromentRepositoryMock from "@src/__mock__/enviromentRepositoryMock";
import CreateEnviromentCommandHandler from "./createEnviromentCommandHandler";
import EnviromentCreator from "./enviromentCreator";
import CreateEnviromentCommandMother from "./createEnviromentCommand.mother";
import EnviromentAlreadyExistsError from "@src/domain/errors/enviromentAlreadyExistsError";
import NewEnviromentCreatedDomainEventMother from "@src/domain/newEnviromentCreatedDomainEvent.mother";

describe('enviromentCreator', () => {

    it("should call the repository with the proper parameter", async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new CreateEnviromentCommandHandler(
                        new EnviromentCreator(repository, eventBus)
        );
        const command = CreateEnviromentCommandMother.random();

        repository.whenFindThenReturn(null);
        await handler.handle(command);

        repository.assertCreateHasBeenCalledWith(
            CreateEnviromentCommandMother.applyCommand(command),
            ['id']
        )
    });

    it("should throw an EnviromentAlreadyExistsError when enviroment does exist", async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new CreateEnviromentCommandHandler(
                        new EnviromentCreator(repository, eventBus)
        );
        const command = CreateEnviromentCommandMother.random();
        const enviroment = CreateEnviromentCommandMother.applyCommand(command);

        try{
            repository.whenFindThenReturn(enviroment);
            await handler.handle(command);
        }
        catch(e){
            expect(e).toBeInstanceOf(EnviromentAlreadyExistsError);
        }
    });

    it("should publish a NewEnviromentCreatedDomainEvent", async () => {
        expect.hasAssertions();

        const repository = new EnviromentRepositoryMock();
        const eventBus = new EventBusMock();
        const handler = new CreateEnviromentCommandHandler(
                        new EnviromentCreator(repository, eventBus)
        );
        const command = CreateEnviromentCommandMother.random();

        repository.whenFindThenReturn(null);

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(NewEnviromentCreatedDomainEventMother.fromEnviroment(
            CreateEnviromentCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.created_at',
                'body.id'
            ]
        );

    });
});