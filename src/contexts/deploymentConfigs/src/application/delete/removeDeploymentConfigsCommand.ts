import Command from "@context/shared/domain/commandBus/command";
import { DeploymentConfigsPrimitives } from "@src/domain/deploymentConfigs";

export type RemoveDeploymentConfigsCommandData = Partial<DeploymentConfigsPrimitives>;

export default class RemoveDeploymentConfigsCommand extends Command{
    readonly data: RemoveDeploymentConfigsCommandData;

    constructor(data: RemoveDeploymentConfigsCommandData){
        super();
        this.data = data;
    }
}