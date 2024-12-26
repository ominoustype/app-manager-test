import DeploymentConfigs from "@src/domain/deploymentConfigs";
import RemoveDeploymentConfigsCommand, { RemoveDeploymentConfigsCommandData, RemoveDeploymentConfigsCommandPermissions } from "./removeDeploymentConfigsCommand";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class RemoveDeploymentConfigsCommandMother {
    static create(data: RemoveDeploymentConfigsCommandData, permissions: RemoveDeploymentConfigsCommandPermissions): RemoveDeploymentConfigsCommand{
        return new RemoveDeploymentConfigsCommand(data, permissions);
    }

    static random(): RemoveDeploymentConfigsCommand{
        return RemoveDeploymentConfigsCommandMother.create(
            DeploymentConfigsMother.random().toPrimitives(), {
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            }
        );
    }

    static applyCommand(command: RemoveDeploymentConfigsCommand): DeploymentConfigs{
        return DeploymentConfigsMother.random(command.data);
    }
}