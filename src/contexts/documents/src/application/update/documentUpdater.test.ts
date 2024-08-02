import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import UpdateDocumentCommandHandler from "./updateDocumentCommandHandler";
import DocumentUpdater from "./documentUpdater";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import UpdateDocumentCommandMother from "./updateDocumentCommand.mother";
import DocumentMother from "@src/domain/document.mother";
import DocumentUpdatedDomainEventMother from "@src/domain/documentUpdatedDomainEvent.mother";

describe('documentUpdater', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateDocumentCommandHandler(
                new DocumentUpdater(repository,eventBus)
            ),
            command = UpdateDocumentCommandMother.random(),
            document = UpdateDocumentCommandMother.applyCommand(command),
            oldDocument = DocumentMother.random(),
            expected = DocumentMother.merge(oldDocument,document);

        repository.whenFindThenReturn(oldDocument);

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected)
    });
    
    it('should publish a DocumentUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateDocumentCommandHandler(
                new DocumentUpdater(repository,eventBus)
            ),
            command = UpdateDocumentCommandMother.random(),
            document = UpdateDocumentCommandMother.applyCommand(command),
            oldDocument = DocumentMother.random(),
            expected = DocumentMother.merge(oldDocument,document);

        repository.whenFindThenReturn(oldDocument);

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            DocumentUpdatedDomainEventMother.create(
                expected.toPrimitives()
            )
        )
    });
});
