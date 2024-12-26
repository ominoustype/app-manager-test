import UuidMother from "@context/shared/domain/uuid.mother";
import RestoreDocumentCommand, { RestoreDocumentCommandData, RestoreDocumentCommandPermissions } from "./restoreDocumentCommand";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import DocumentMother from "@src/domain/document.mother";
import Document from "@src/domain/document";
import PreviousesMother from "@src/domain/previous/previouses.mother";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class RestoreDocumentCommandMother {
    static create(data: RestoreDocumentCommandData, permissions: RestoreDocumentCommandPermissions): RestoreDocumentCommand {
        return new RestoreDocumentCommand(data, permissions);
    }

    static random(): RestoreDocumentCommand {
        return RestoreDocumentCommandMother.create({
            id: UuidMother.random().toString(),
            version: MotherCreator.word()
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        })
    }

    static applyCommand(command: RestoreDocumentCommand): Document {
        return DocumentMother.random({
            id: command.data.id
        })
    }

    static applyCommandRightValues(command: RestoreDocumentCommand): Document {
        const list = PreviousesMother.randomWithSize(6).toPrimitives();
        list[list.length / 2].changes.version = command.data.version;

        return DocumentMother.random({
            id: command.data.id,
            previous: list
        })
    }
}