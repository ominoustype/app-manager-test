import UuidMother from "@context/shared/domain/uuid.mother";
import PushDocumentCommand, { PushDocumentCommandData } from "./pushDocumentCommand";
import Document from "@src/domain/document";
import DocumentMother from "@src/domain/document.mother";
import DocumentStatus from "@src/domain/documentStatus";

export default class PushDocumentCommandMother {
    static create(data: PushDocumentCommandData): PushDocumentCommand {
        return new PushDocumentCommand(data);
    }

    static random(): PushDocumentCommand {
        return PushDocumentCommandMother.create({
            id: UuidMother.random().toString()
        })
    }

    static applyCommand(command: PushDocumentCommand): Document {
        return DocumentMother.random({
            id: command.data.id
        })
    }

    static applyCommandDocumentReady(command: PushDocumentCommand): Document {
        return DocumentMother.random({
            id: command.data.id,
            status: DocumentStatus.READY
        })
    }
}