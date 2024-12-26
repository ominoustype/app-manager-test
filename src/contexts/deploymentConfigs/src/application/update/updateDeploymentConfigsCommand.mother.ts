import DeploymentConfigs from "@src/domain/deploymentConfigs";
import UpdateDeploymentConfigsCommand, { UpdateDeploymentConfigsCommandData, UpdateDeploymentConfigsCommandPermissions } from "./updateDeploymentConfigsCommand";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class UpdateDeploymentConfigsCommandMother{
    static create(data: UpdateDeploymentConfigsCommandData, permissions: UpdateDeploymentConfigsCommandPermissions): UpdateDeploymentConfigsCommand{
        return new UpdateDeploymentConfigsCommand(data, permissions);
    }

    static random(): UpdateDeploymentConfigsCommand{
        return UpdateDeploymentConfigsCommandMother.create(
            DeploymentConfigsMother.random().toPrimitives(),
        {
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        });
    }    
    
    static applyCommand(command: UpdateDeploymentConfigsCommand): DeploymentConfigs{
        return DeploymentConfigsMother.random(command.data);
    }
}