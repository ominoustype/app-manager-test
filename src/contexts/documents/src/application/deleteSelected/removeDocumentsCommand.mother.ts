import DocumentMother from '@src/domain/document.mother';
import RemoveDocumentsCommand, { RemoveDocumentsCommandData } from './removeDocumentsCommand';

export default class RemoveDocumentsCommandMother {
    static create(data: RemoveDocumentsCommandData): RemoveDocumentsCommand {
        return new RemoveDocumentsCommand(data);
    }

    static random(): RemoveDocumentsCommand {
        return RemoveDocumentsCommandMother.create(
            DocumentMother.randomList().map((document) => document.id.value)        )
    }
}
