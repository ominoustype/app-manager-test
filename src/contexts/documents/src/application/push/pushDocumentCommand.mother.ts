import UuidMother from "@context/shared/domain/uuid.mother";
import PushDocumentCommand, { PushDocumentCommandData, PushDocumentCommandPermissions } from "./pushDocumentCommand";
import Document from "@src/domain/document";
import DocumentMother from "@src/domain/document.mother";
import DocumentStatus from "@src/domain/documentStatus";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class PushDocumentCommandMother {
    static create(data: PushDocumentCommandData, permissions: PushDocumentCommandPermissions): PushDocumentCommand {
        return new PushDocumentCommand(data, permissions);
    }

    static random(): PushDocumentCommand {
        return PushDocumentCommandMother.create({
            id: UuidMother.random().toString()
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value) 
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