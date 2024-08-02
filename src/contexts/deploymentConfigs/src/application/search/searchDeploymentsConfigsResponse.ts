import { Response } from "@context/shared/domain/queryBus/response";
import DeploymentsConfigs, { DeploymentsConfigsPrimitives } from "@src/domain/deploymentsConfigs";

export default class SearchDeploymentsConfigsResponse implements Response{
    readonly deploymentsConfigs: DeploymentsConfigsPrimitives;

    constructor(deploymentsConfigs: DeploymentsConfigs){
        this.deploymentsConfigs = deploymentsConfigs.toPrimitives();
    }
}