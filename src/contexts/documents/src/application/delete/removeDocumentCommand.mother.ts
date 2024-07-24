import Document from '@src/domain/document';
import DocumentMother from '@src/domain/document.mother';
import RemoveDocumentCommand, { RemoveDocumentCommandData } from './removeDocumentCommand';

export default class RemoveDocumentCommandMother {
    static create(data: RemoveDocumentCommandData): RemoveDocumentCommand {
        return new RemoveDocumentCommand(data);
    }

    static random(): RemoveDocumentCommand {
        return RemoveDocumentCommandMother.create(
            DocumentMother.random().toPrimitives()
        )
    }

    static applyCommand(command: RemoveDocumentCommand): Document {
        return DocumentMother.random(command.data)
    }
}
