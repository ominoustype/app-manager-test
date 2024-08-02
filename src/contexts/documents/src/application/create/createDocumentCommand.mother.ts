import Document from '@src/domain/document';
import DocumentMother from '@src/domain/document.mother';
import CreateDocumentCommand, { CreateDocumentCommandData } from './createDocumentCommand';

export default class CreateDocumentCommandMother {
    static create(data: CreateDocumentCommandData): CreateDocumentCommand {
        return new CreateDocumentCommand(data);
    }

    static random(): CreateDocumentCommand {
        return CreateDocumentCommandMother.create(
            DocumentMother.random().toPrimitives()
        )
    }

    static applyCommand(command: CreateDocumentCommand): Document {
        return DocumentMother.random(command.data)
    }
}
