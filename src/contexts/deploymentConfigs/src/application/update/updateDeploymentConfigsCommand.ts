import Command from "@context/shared/domain/commandBus/command";
import { DeploymentConfigsPrimitives } from "@src/domain/deploymentConfigs";

export type UpdateDeploymentConfigsCommandData = Partial<DeploymentConfigsPrimitives>;

export default class UpdateDeploymentConfigsCommand extends Command{
    readonly data: UpdateDeploymentConfigsCommandData;

    constructor(data:UpdateDeploymentConfigsCommandData){
        super();
        this.data = data;
    }
}

