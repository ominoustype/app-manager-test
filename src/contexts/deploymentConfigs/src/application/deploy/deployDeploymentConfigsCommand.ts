import Command from "@context/shared/domain/commandBus/command";

export type DeployDeploymentConfigsCommandData = {
    environmentId: string,
    username: string,
    password: string,
    path: string
}

export default class DeployDeploymentConfigsCommand extends Command {
    readonly data: DeployDeploymentConfigsCommandData;

    constructor(data: DeployDeploymentConfigsCommandData){
        super();
        this.data = data;
    }
}