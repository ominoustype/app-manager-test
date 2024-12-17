import Command from "@context/shared/domain/commandBus/command";
import { EnvironmentPrimitives } from "@src/domain/environment";

export type DeployEnvironmentCommandData = {
    primitives: Partial<EnvironmentPrimitives>,
    deploymentConfigsId: string
}

export default class DeployEnvironmentCommand extends Command{
    readonly data: DeployEnvironmentCommandData;

    constructor(data: DeployEnvironmentCommandData){
        super();
        this.data = data;
    }
}