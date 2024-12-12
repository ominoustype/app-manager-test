import UuidMother from "@context/shared/domain/uuid.mother";
import DeployDocumentCommand, { DeployDocumentCommandData } from "./deployDocumentCommand";
import DocumentMother from "@src/domain/document.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Document from "@src/domain/document";

export default class DeployDocumentCommandMother {
    static create(data: DeployDocumentCommandData): DeployDocumentCommand {
        return new DeployDocumentCommand(data);
    }

    static random(): DeployDocumentCommand {
        return DeployDocumentCommandMother.create({
            environmentId: UuidMother.random().toString()
        })
    }

    static applyCommand(command: DeployDocumentCommand): Document {
        return DocumentMother.random({
            environment: {
                id: command.data.environmentId,
                name: MotherCreator.words()
            }
        })
    }
}