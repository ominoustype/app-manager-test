import Document from '@src/domain/document';
import DocumentMother from '@src/domain/document.mother';
import UpdateDocumentCommand, { UpdateDocumentCommandData } from './updateDocumentCommand';

export default class UpdateDocumentCommandMother {
    static create(data: UpdateDocumentCommandData): UpdateDocumentCommand {
        return new UpdateDocumentCommand(data);
    }

    static random(): UpdateDocumentCommand {
        return UpdateDocumentCommandMother.create(
            DocumentMother.random().toPrimitives()
        )
    }

    static applyCommand(command: UpdateDocumentCommand): Document {
        return DocumentMother.random(command.data)
    }
}
