import UuidMother from "@context/shared/domain/uuid.mother";
import UndoPushDocumentCommand, { UndoPushDocumentCommandData, UndoPushDocumentCommandPermissions } from "./undoPushDocumentCommand";
import DocumentMother from "@src/domain/document.mother";
import Document from "@src/domain/document";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class UndoPushDocumentCommandMother {
    static create(data: UndoPushDocumentCommandData, permissions: UndoPushDocumentCommandPermissions): UndoPushDocumentCommand {
        return new UndoPushDocumentCommand(data, permissions);
    }

    static random(): UndoPushDocumentCommand {
        return UndoPushDocumentCommandMother.create({
            id: UuidMother.random().toString()
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            
        });
    }

    static applyCommand(command: UndoPushDocumentCommand): Document {
        return DocumentMother.random({
            id: command.data.id
        });
    }

    static applyCommandDocumentReady(command: UndoPushDocumentCommand): Document {
        return DocumentMother.randomReady({
            id: command.data.id
        });
    }
}