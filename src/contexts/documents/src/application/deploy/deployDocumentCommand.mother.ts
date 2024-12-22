import UuidMother from "@context/shared/domain/uuid.mother";
import DeployDocumentCommand, { DeployDocumentCommandData, DeployDocumentCommandPermissions } from "./deployDocumentCommand";
import DocumentMother from "@src/domain/document.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Document from "@src/domain/document";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class DeployDocumentCommandMother {
    static create(data: DeployDocumentCommandData, permissions: DeployDocumentCommandPermissions): DeployDocumentCommand {
        return new DeployDocumentCommand(data, permissions);
    }

    static random(): DeployDocumentCommand {
        return DeployDocumentCommandMother.create({
            environmentId: UuidMother.random().toString()
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            
        });
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