import Command from "@context/shared/domain/commandBus/command";
import { DeploymentConfigsPrimitives } from "@src/domain/deploymentConfigs";

export type CreateDeploymentConfigsCommandData = Omit<DeploymentConfigsPrimitives, 'id' | 'createdAt' | 'name' | 'deviceType' | 
    'path' | 'isDeployed' | 'deployedAt'>;

export default class CreateDeploymentConfigsCommand extends Command{
    readonly data: CreateDeploymentConfigsCommandData;

    constructor(data: CreateDeploymentConfigsCommandData){
        super();
        this.data = data;
    }
}