import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import RestoreDocumentCommandHandler from "./restoreDocumentCommandHandler";
import DocumentRestorer from "./documentRestorer";
import RestoreDocumentCommandMother from "./restoreDocumentCommand.mother";
import DocumentRestoredDomainEventMother from "@src/domain/documentRestoredDomainEvent.mother";
import DocumentVersionNotFoundError from "@src/domain/errors/documentVersionNotFoundError";

describe('documentRestorer', () => {
    it('should publish a documentRestoredDomainEvent', async () => {
        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RestoreDocumentCommandHandler(
                new DocumentRestorer(repository,eventBus)
            ),
            command = RestoreDocumentCommandMother.random(),
            document = RestoreDocumentCommandMother.applyCommandRightValues(command), // TODO check
            expected = document.restore(command.data.version);

        repository.whenFindThenReturn(document);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            DocumentRestoredDomainEventMother.create(
                expected!.toPrimitives()
            )
        )
    });

    it('should throw a DocumentVersionNotFoundError', async () => {
        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RestoreDocumentCommandHandler(
                new DocumentRestorer(repository,eventBus)
            ),
            command = RestoreDocumentCommandMother.random(),
            document = RestoreDocumentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(document);

        try{
            await handler.handle(command);
        }
        catch(e){
            expect(e).toBeInstanceOf(DocumentVersionNotFoundError);
        }
    });
});
