import Command from "@context/shared/domain/commandBus/command";
import { DeploymentConfigsPrimitives } from "@src/domain/deploymentConfigs";

export type UpdateDeploymentConfigsCommandData = Partial<DeploymentConfigsPrimitives>;

export type UpdateDeploymentConfigsCommandPermissions = {
    environmentIds: Array<string>
};

export default class UpdateDeploymentConfigsCommand extends Command{
    readonly data: UpdateDeploymentConfigsCommandData;
    readonly permissions: UpdateDeploymentConfigsCommandPermissions;

    constructor(data:UpdateDeploymentConfigsCommandData, permissions: UpdateDeploymentConfigsCommandPermissions){
        super();
        this.data = data;
        this.permissions = permissions;
    }
}

