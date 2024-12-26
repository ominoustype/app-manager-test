import Document from '@src/domain/document';
import DocumentMother from '@src/domain/document.mother';
import UpdateDocumentCommand, { UpdateDocumentCommandData, UpdateDocumentCommandPermissions } from './updateDocumentCommand';
import DocumentStatus from '@src/domain/documentStatus';
import EnvironmentIdMother from '@src/domain/environment/environmentId.mother';

export default class UpdateDocumentCommandMother {
    static create(data: UpdateDocumentCommandData, permissions: UpdateDocumentCommandPermissions): UpdateDocumentCommand {
        return new UpdateDocumentCommand(data, permissions);
    }

    static random(): UpdateDocumentCommand {
        return UpdateDocumentCommandMother.create({
            ...DocumentMother.random().toPrimitives(),
            status: DocumentStatus.DRAFT
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        });
    }

    static applyCommand(command: UpdateDocumentCommand): Document {
        return DocumentMother.random(command.data)
    }
}
