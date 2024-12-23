import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";
import DeployDeploymentConfigsCommand, { DeployDeploymentConfigsCommandData, DeployDeploymentConfigsCommandPermissions } from "./deployDeploymentConfigsCommand";
import DeploymentConfigs from "@src/domain/deploymentConfigs";
import UuidMother from "@context/shared/domain/uuid.mother";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class DeployDeploymentConfigsCommandMother {
    static create(data: DeployDeploymentConfigsCommandData, permissions: DeployDeploymentConfigsCommandPermissions): 
        DeployDeploymentConfigsCommand{
        return new DeployDeploymentConfigsCommand(data, permissions);
    }

    static random(): DeployDeploymentConfigsCommand{
        return DeployDeploymentConfigsCommandMother.create({
            environmentId: UuidMother.random().value,
            username: "reacsaatmoust",
            password: "PfGszkpFFbPOToTsxmR1ZNCHOimpCc4OV+ZIRnkGFzYgAkuMDzSd0PeWCUWQCdSHxFSDKLlk906EwsswsIxYzg==",
            path: "epamclient/appconfig"
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)        
        });
    }

    static applyCommand(command: DeployDeploymentConfigsCommand): DeploymentConfigs{
        return DeploymentConfigsMother.random(command.data);
    }
}