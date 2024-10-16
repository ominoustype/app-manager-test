import Document from '@src/domain/document';
import DocumentMother from '@src/domain/document.mother';
import MoveDocumentCommand, { MoveDocumentCommandData } from './moveDocumentCommand';
import UuidMother from '@context/shared/domain/uuid.mother';
import MotherCreator from '@context/shared/domain/motherCreator.mother';

export default class MoveDocumentCommandMother {
    static create(data: MoveDocumentCommandData): MoveDocumentCommand {
        return new MoveDocumentCommand(data);
    }

    static random(): MoveDocumentCommand {
        return MoveDocumentCommandMother.create({
            documentId: UuidMother.random().toString(),
            newEnvironmentId: UuidMother.random().toString()
        })
    }

    static applyCommand(command: MoveDocumentCommand): Document {
        return DocumentMother.random({
            id: command.documentId,
            environment: {
                id: command.newEnvironmentId,
                name: MotherCreator.word()
            }
        })
    }
}
