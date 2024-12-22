import Document from '@src/domain/document';
import DocumentMother from '@src/domain/document.mother';
import RemoveDocumentCommand, { RemoveDocumentCommandData, RemoveDocumentCommandPermissions } from './removeDocumentCommand';
import EnvironmentIdMother from '@src/domain/environment/environmentId.mother';

export default class RemoveDocumentCommandMother {
    static create(data: RemoveDocumentCommandData, permissions: RemoveDocumentCommandPermissions): RemoveDocumentCommand {
        return new RemoveDocumentCommand(data, permissions);
    }

    static random(): RemoveDocumentCommand {
        return RemoveDocumentCommandMother.create(
            DocumentMother.random().toPrimitives(),
            {
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            }
        )
    }

    static applyCommand(command: RemoveDocumentCommand): Document {
        return DocumentMother.random(command.data)
    }
}
