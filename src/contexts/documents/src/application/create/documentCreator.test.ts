import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import CreateDocumentCommandHandler from "./createDocumentCommandHandler";
import DocumentCreator from "./documentCreator";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import CreateDocumentCommandMother from "./createDocumentCommand.mother";
import NewDocumentCreatedDomainEventMother from "@src/domain/newDocumentCreatedDomainEvent.mother";
import DocumentAlreadyExistsError from "@src/domain/errors/documentAlreadyExistsError";

describe('documentCreator', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateDocumentCommandHandler(
                new DocumentCreator(repository,eventBus)
            ),
            command = CreateDocumentCommandMother.random();

        repository.whenFindThenReturn(null);

        await handler.handle(command);

        repository.assertCreateHasBeenCalledWith(
            CreateDocumentCommandMother.applyCommand(command),
            ['id', 'createdAt', 'savedAt', 'status', 'version']
        )
    });
    
    it('should throw a DocumentAlreadyExistsError', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateDocumentCommandHandler(
                new DocumentCreator(repository,eventBus)
            ),
            command = CreateDocumentCommandMother.random(),
            document = CreateDocumentCommandMother.applyCommand(command);

        try{     
            repository.whenFindThenReturn(document);

            await handler.handle(command);
        } catch (e) {
            expect(e).toBeInstanceOf(DocumentAlreadyExistsError);
        }
    });

    it('should publish a NewDocumentCreatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new CreateDocumentCommandHandler(
                new DocumentCreator(repository,eventBus)
            ),
            command = CreateDocumentCommandMother.random();
        
        repository.whenFindThenReturn(null);
        
        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            NewDocumentCreatedDomainEventMother.fromDocument(
                CreateDocumentCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.createdAt',
                'body.savedAt',
                'body.id',
                'body.version',
                'body.status'
            ]
        )
    });
});
