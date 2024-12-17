import { Response } from '@context/shared/domain/queryBus/response';
import DeploymentsConfigs, { DeploymentsConfigsPrimitives } from '@src/domain/deploymentsConfigs';

export default class SearchByEnvironmentIsDeployedDeploymentConfigsResponse implements Response {
    readonly primitives: DeploymentsConfigsPrimitives;

    constructor(deploymentsConfigs: DeploymentsConfigs) {
        this.primitives = deploymentsConfigs.toPrimitives();
    }
}