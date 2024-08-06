import DeploymentConfigs from "@src/domain/deploymentConfigs";
import CreateDeploymentConfigsCommand, { CreateDeploymentConfigsCommandData } from "./createDeploymentConfigsCommand";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";

export default class CreateDeploymentConfigsCommandMother {
    static create(data: CreateDeploymentConfigsCommandData): CreateDeploymentConfigsCommand{
        return new CreateDeploymentConfigsCommand(data);
    }

    static random(): CreateDeploymentConfigsCommand{
        return CreateDeploymentConfigsCommandMother.create(
            DeploymentConfigsMother.random().toPrimitives()
        );
    }

    static applyCommand(command: CreateDeploymentConfigsCommand): DeploymentConfigs{
        return DeploymentConfigsMother.random(command.data);
    }
}