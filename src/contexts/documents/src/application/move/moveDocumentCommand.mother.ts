import Document from '@src/domain/document';
import DocumentMother from '@src/domain/document.mother';
import MoveDocumentCommand, { MoveDocumentCommandData, MoveDocumentCommandPermissions } from './moveDocumentCommand';
import UuidMother from '@context/shared/domain/uuid.mother';
import MotherCreator from '@context/shared/domain/motherCreator.mother';
import EnvironmentIdMother from '@src/domain/environment/environmentId.mother';

export default class MoveDocumentCommandMother {
    static create(data: MoveDocumentCommandData, permissions: MoveDocumentCommandPermissions): MoveDocumentCommand {
        return new MoveDocumentCommand(data, permissions);
    }

    static random(): MoveDocumentCommand {
        return MoveDocumentCommandMother.create({
            documentId: UuidMother.random().toString(),
            newEnvironmentId: UuidMother.random().toString()
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value) 
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
