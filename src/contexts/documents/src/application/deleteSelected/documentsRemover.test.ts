import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import RemoveDocumentsCommandHandler from "./removeDocumentsCommandHandler";
import DocumentsRemover from "./documentsRemover";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import RemoveDocumentsCommandMother from "./removeDocumentsCommand.mother";
import DocumentRemovedDomainEventMother from "@src/domain/documentRemovedDomainEvent.mother";
import DocumentsMother from "@src/domain/documents.mother";

describe('documentsRemover', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RemoveDocumentsCommandHandler(
                new DocumentsRemover(repository,eventBus)
            ),
            command = RemoveDocumentsCommandMother.random(),

        repository.whenFindThenReturn(document)

        await handler.handle(command);

        repository.assertDeleteHasBeenCalledWith(document);
    });
    
    it('should publish a DocumentRemovedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RemoveDocumentsCommandHandler(
                new DocumentsRemover(repository,eventBus)
            ),
            command = RemoveDocumentsCommandMother.random(),
            document = RemoveDocumentsCommandMother.applyCommand(command);

        repository.whenFindThenReturn(document);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(
            DocumentRemovedDomainEventMother.fromDocument(
                RemoveDocumentsCommandMother.applyCommand(command)
            ),
            [
                'aggregateId',
                'body.createdAt',
                'body.id'
            ]
        )
    });






    it('should remove a document', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            commandBus = new CommandBusMock(),
            handler = new RemoveDocumentsCommandHandler(
                new DocumentsRemover(repository, commandBus)
            ),
            documents = DocumentsMother.randomWithSize(1).map((u) =>
                u.toPrimitives()
            ),
            documentnames = documents.map((u) => u.documentname),
            command = RemoveDocumentsCommandMother.create(documentnames),
            document = new Document(documents[0]);

        repository.whenFindByDocumentnameThenReturn(document);

        await handler.handle(command);

        repository.ensureDeleteHasBeenCalledWith(document);
    });

    it('should call delete', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock();
        const commandBus = new CommandBusMock();
        const handler = new RemoveDocumentsCommandHandler(
            new DocumentsRemover(repository, commandBus)
        );

        const documents = DocumentsMother.random().map((u) => u.toPrimitives());
        const documentnames = documents.map((u) => u.documentname);
        const command = RemoveDocumentsCommandMother.create(documentnames);
        const document = new Document(documents[0]);

        repository.whenFindByDocumentnameThenReturn(document);

        await handler.handle(command);

        repository.ensureDeleteHasBeenCalledTimes(documents.length);
    });

    it('should find the document with the right params', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock();
        const commandBus = new CommandBusMock();
        const handler = new RemoveDocumentsCommandHandler(
            new DocumentsRemover(repository, commandBus)
        );

        const documents = DocumentsMother.randomWithSize(1).map((u) =>
            u.toPrimitives()
        );
        const documentnames = documents.map((u) => u.documentname);
        const command = RemoveDocumentsCommandMother.create(documentnames);
        const document = new Document(documents[0]);

        repository.whenFindByDocumentnameThenReturn(document);

        await handler.handle(command);

        repository.ensureFindByDocumentnameCalledWith(document.documentname);
    });

});
