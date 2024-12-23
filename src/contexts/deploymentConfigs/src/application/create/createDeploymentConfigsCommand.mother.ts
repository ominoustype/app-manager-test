import DeploymentConfigs from "@src/domain/deploymentConfigs";
import CreateDeploymentConfigsCommand, { CreateDeploymentConfigsCommandData, CreateDeploymentConfigsCommandPermissions } from "./createDeploymentConfigsCommand";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class CreateDeploymentConfigsCommandMother {
    static create(data: CreateDeploymentConfigsCommandData, permissions: CreateDeploymentConfigsCommandPermissions): CreateDeploymentConfigsCommand{
        return new CreateDeploymentConfigsCommand(data, permissions);
    }

    static random(): CreateDeploymentConfigsCommand{
        return CreateDeploymentConfigsCommandMother.create(
            DeploymentConfigsMother.random().toPrimitives(), {
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            }
        );
    }

    static applyCommand(command: CreateDeploymentConfigsCommand): DeploymentConfigs{
        return DeploymentConfigsMother.random(command.data);
    }
}