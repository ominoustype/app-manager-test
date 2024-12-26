import Command from "@context/shared/domain/commandBus/command";
import { DeploymentConfigsPrimitives } from "@src/domain/deploymentConfigs";

export type CreateDeploymentConfigsCommandData = Omit<DeploymentConfigsPrimitives, 'id' | 'createdAt' | 'name' | 'deviceType' | 
    'path' | 'isDeployed' | 'deployedAt'>;

export type CreateDeploymentConfigsCommandPermissions = {
    environmentIds: Array<string>
};

export default class CreateDeploymentConfigsCommand extends Command{
    readonly data: CreateDeploymentConfigsCommandData;
    readonly permissions: CreateDeploymentConfigsCommandPermissions;

    constructor(data: CreateDeploymentConfigsCommandData, pemissions: CreateDeploymentConfigsCommandPermissions){
        super();
        this.data = data;
        this.permissions = pemissions;
    }
}