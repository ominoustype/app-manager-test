import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import EnvironmentRepositoryMock from "@src/__mock__/environmentRepositoryMock";
import CreateEnvironmentCommandHandler from "./createEnvironmentCommandHandler";
import EnvironmentCreator from "./environmentCreator";
import CreateEnvironmentCommandMother from "./createEnvironmentCommand.mother";
import EnvironmentAlreadyExistsError from "@src/domain/errors/environmentAlreadyExistsError";
import NewEnvironmentCreatedDomainEventMother from "@src/domain/newEnvironmentCreatedDomainEvent.mother";

describe('environmentCreator', () => {

    it("should call the repository with the proper parameter", async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateEnvironmentCommandHandler(
                        new EnvironmentCreator(repository, eventBus)
        ),
            command = CreateEnvironmentCommandMother.random();

        repository.whenFindThenReturn(null);
        await handler.handle(command);

        repository.assertCreateHasBeenCalledWith(
            CreateEnvironmentCommandMother.applyCommand(command),
            ['id']
        )
    });

    it("should throw an EnvironmentAlreadyExistsError when environment does exist", async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
        eventBus = new EventBusMock(),
        handler = new CreateEnvironmentCommandHandler(
                        new EnvironmentCreator(repository, eventBus)
        ),
        command = CreateEnvironmentCommandMother.random(),
        environment = CreateEnvironmentCommandMother.applyCommand(command);

        try{
            repository.whenFindThenReturn(environment);
            await handler.handle(command);
        }
        catch(e){
            expect(e).toBeInstanceOf(EnvironmentAlreadyExistsError);
        }
    });

    it("should publish a NewEnvironmentCreatedDomainEvent", async () => {
        expect.hasAssertions();

        const repository = new EnvironmentRepositoryMock(),
        eventBus = new EventBusMock(),
        handler = new CreateEnvironmentCommandHandler(
                        new EnvironmentCreator(repository, eventBus)
        ),
        command = CreateEnvironmentCommandMother.random();

        repository.whenFindThenReturn(null);

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(NewEnvironmentCreatedDomainEventMother.fromEnvironment(
            CreateEnvironmentCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.created_at',
                'body.id'
            ]
        );

    });
});