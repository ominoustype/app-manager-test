import UuidMother from "@context/shared/domain/uuid.mother";
import UndoPushDocumentCommand, { UndoPushDocumentCommandData } from "./undoPushDocumentCommand";
import DocumentMother from "@src/domain/document.mother";
import Document from "@src/domain/document";

export default class UndoPushDocumentCommandMother {
    static create(data: UndoPushDocumentCommandData): UndoPushDocumentCommand {
        return new UndoPushDocumentCommand(data);
    }

    static random(): UndoPushDocumentCommand {
        return UndoPushDocumentCommandMother.create({
            id: UuidMother.random().toString()
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