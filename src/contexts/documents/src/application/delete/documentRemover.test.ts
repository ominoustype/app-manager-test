import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import RemoveDocumentCommandHandler from "./removeDocumentCommandHandler";
import DocumentRemover from "./documentRemover";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import RemoveDocumentCommandMother from "./removeDocumentCommand.mother";
import DocumentRemovedDomainEventMother from "@src/domain/documentRemovedDomainEvent.mother";

describe('documentRemover', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RemoveDocumentCommandHandler(
                new DocumentRemover(repository,eventBus)
            ),
            command = RemoveDocumentCommandMother.random(),
            document = RemoveDocumentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(document)

        await handler.handle(command);

        repository.assertDeleteHasBeenCalledWith(document);
    });
    
    it('should publish a DocumentRemovedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RemoveDocumentCommandHandler(
                new DocumentRemover(repository,eventBus)
            ),
            command = RemoveDocumentCommandMother.random(),
            document = RemoveDocumentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(document);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            DocumentRemovedDomainEventMother.fromDocument(
                RemoveDocumentCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.created_at',
                'body.id'
            ]
        )
    });
});
