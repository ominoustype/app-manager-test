import Document from '@src/domain/document';
import DocumentMother from '@src/domain/document.mother';
import CreateDocumentCommand, { CreateDocumentCommandData, CreateDocumentCommandPermissions } from './createDocumentCommand';
import EnvironmentIdMother from '@src/domain/environment/environmentId.mother';

export default class CreateDocumentCommandMother {
    static create(data: CreateDocumentCommandData, permissions: CreateDocumentCommandPermissions): CreateDocumentCommand {
        return new CreateDocumentCommand(data, permissions);
    }

    static random(): CreateDocumentCommand {
        return CreateDocumentCommandMother.create(
            DocumentMother.random().toPrimitives(),
            {
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            }
        )
    }

    static applyCommand(command: CreateDocumentCommand): Document {
        return DocumentMother.random(command.data)
    }
}
