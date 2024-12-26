import Command from "@context/shared/domain/commandBus/command";

export type DeployDeploymentConfigsCommandData = {
    environmentId: string,
    username: string,
    password: string,
    path: string
}

export type DeployDeploymentConfigsCommandPermissions = {
    environmentIds: Array<string>
};

export default class DeployDeploymentConfigsCommand extends Command {
    readonly data: DeployDeploymentConfigsCommandData;
    readonly permissions: DeployDeploymentConfigsCommandPermissions;

    constructor(data: DeployDeploymentConfigsCommandData, permissions: DeployDeploymentConfigsCommandPermissions){
        super();
        this.data = data;
        this.permissions = permissions;
    }
}