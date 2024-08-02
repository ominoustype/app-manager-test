import DeploymentConfigs from "@src/domain/deploymentConfigs";
import UpdateDeploymentConfigsCommand, { UpdateDeploymentConfigsCommandData } from "./updateDeploymentConfigsCommand";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";

export default class UpdateDeploymentConfigsCommandMother{
    static create(data: UpdateDeploymentConfigsCommandData): UpdateDeploymentConfigsCommand{
        return new UpdateDeploymentConfigsCommand(data);
    }

    static random(): UpdateDeploymentConfigsCommand{
        return UpdateDeploymentConfigsCommandMother.create(
            DeploymentConfigsMother.random().toPrimitives());
        }    
    
    static applyCommand(command: UpdateDeploymentConfigsCommand): DeploymentConfigs{
        return DeploymentConfigsMother.random(command.data);
    }
}