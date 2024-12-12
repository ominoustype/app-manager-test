import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";
import DeployDeploymentConfigsCommand, { DeployDeploymentConfigsCommandData } from "./deployDeploymentConfigsCommand";
import DeploymentConfigs from "@src/domain/deploymentConfigs";
import UuidMother from "@context/shared/domain/uuid.mother";

export default class DeployDeploymentConfigsCommandMother {
    static create(data: DeployDeploymentConfigsCommandData): DeployDeploymentConfigsCommand{
        return new DeployDeploymentConfigsCommand(data);
    }

    static random(): DeployDeploymentConfigsCommand{
        return DeployDeploymentConfigsCommandMother.create({
            environmentId: UuidMother.random().value,
            username: "reacsaatmoust",
            password: "PfGszkpFFbPOToTsxmR1ZNCHOimpCc4OV+ZIRnkGFzYgAkuMDzSd0PeWCUWQCdSHxFSDKLlk906EwsswsIxYzg==",
            path: "epamclient/appconfig"
        });
    }

    static applyCommand(command: DeployDeploymentConfigsCommand): DeploymentConfigs{
        return DeploymentConfigsMother.random(command.data);
    }
}