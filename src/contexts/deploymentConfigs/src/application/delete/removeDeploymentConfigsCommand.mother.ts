import DeploymentConfigs from "@src/domain/deploymentConfigs";
import RemoveDeploymentConfigsCommand, { RemoveDeploymentConfigsCommandData } from "./removeDeploymentConfigsCommand";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";

export default class RemoveDeploymentConfigsCommandMother {
    static create(data: RemoveDeploymentConfigsCommandData): RemoveDeploymentConfigsCommand{
        return new RemoveDeploymentConfigsCommand(data);
    }

    static random(): RemoveDeploymentConfigsCommand{
        return RemoveDeploymentConfigsCommandMother.create(
            DeploymentConfigsMother.random().toPrimitives()
        );
    }

    static applyCommand(command: RemoveDeploymentConfigsCommand): DeploymentConfigs{
        return DeploymentConfigsMother.random(command.data);
    }
}