import Command from "@context/shared/domain/commandBus/command";
import { DeploymentConfigsPrimitives } from "@src/domain/deploymentConfigs";

export type RemoveDeploymentConfigsCommandData = Partial<DeploymentConfigsPrimitives>;

export type RemoveDeploymentConfigsCommandPermissions = {
    environmentIds: Array<string>
};

export default class RemoveDeploymentConfigsCommand extends Command{
    readonly data: RemoveDeploymentConfigsCommandData;
    readonly permissions: RemoveDeploymentConfigsCommandPermissions;

    constructor(data: RemoveDeploymentConfigsCommandData, permissions: RemoveDeploymentConfigsCommandPermissions){
        super();
        this.data = data;
        this.permissions = permissions;
    }
}