import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import MoveDocumentCommandHandler from "./moveDocumentCommandHandler";
import DocumentMover from "./documentMover";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import MoveDocumentCommandMother from "./moveDocumentCommand.mother";
import DocumentMother from "@src/domain/document.mother";
import DocumentUpdatedDomainEventMother from "@src/domain/documentUpdatedDomainEvent.mother";
import QueryBusMock from "@context/shared/__mocks__/queryBus.mock";
import FindEnvironmentResponseMother from "@context/environments/application/find/findEnvironmentResponse.mother";
import EnvironmentMother from "@src/domain/environment/environment.mother";
import DocumentPreviousReadyError from "@src/domain/errors/documentPreviousReadyError";

describe('documentMover', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            handler = new MoveDocumentCommandHandler(
                new DocumentMover(repository,eventBus,queryBus)
            ),
            command = MoveDocumentCommandMother.random(),
            document = MoveDocumentCommandMother.applyCommand(command),
            oldDocument = DocumentMother.create({
                ...document.toPrimitives(),
                environment: EnvironmentMother.random().toPrimitives()
            }),
            //expected = DocumentMother.merge(oldDocument,document);
            expected = oldDocument.move(document.environment.toPrimitives());


        repository.whenFindThenReturn(oldDocument);
        queryBus.whenAskThenReturn(
            FindEnvironmentResponseMother.random(document.environment.toPrimitives())
        );

        await handler.handle(command);

        repository.assertUpdateHasBeenCalledWith(expected!, ['savedAt']);
    });
    
    it('should publish a documentUpdatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            handler = new MoveDocumentCommandHandler(
                new DocumentMover(repository,eventBus,queryBus)
            ),
            command = MoveDocumentCommandMother.random(),
            document = MoveDocumentCommandMother.applyCommand(command),
            oldDocument = DocumentMother.create({
                ...document.toPrimitives(),
                environment: EnvironmentMother.random().toPrimitives()
            }),
            //expected = DocumentMother.merge(oldDocument,document);
            expected = oldDocument.move(document.environment.toPrimitives());


        repository.whenFindThenReturn(oldDocument);
        queryBus.whenAskThenReturn(
            FindEnvironmentResponseMother.random(document.environment.toPrimitives())
        );

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            DocumentUpdatedDomainEventMother.create(
                expected!.toPrimitives()
            )
        )
    });

    it('should throw a DocumentPreviousReadyError', async () => {
        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            handler = new MoveDocumentCommandHandler(
                new DocumentMover(repository,eventBus, queryBus)
            ),
            command = MoveDocumentCommandMother.random(),
            document = MoveDocumentCommandMother.applyCommand(command);

        repository.whenFindThenReturn(document);
        queryBus.whenAskThenReturn(
            FindEnvironmentResponseMother.random(document.environment.toPrimitives())
        );

        try{
            await handler.handle(command);
        }
        catch(e){
            expect(e).toBeInstanceOf(DocumentPreviousReadyError);
        }
    });
});
