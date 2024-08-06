import { Response } from '@context/shared/domain/queryBus/response';
import DeploymentConfigs, {DeploymentConfigsPrimitives} from '@src/domain/deploymentConfigs';

export default class FindDeploymentConfigsResponse implements Response{
    readonly primitives : DeploymentConfigsPrimitives;

    constructor(deploymentConfigs : DeploymentConfigs){
        this.primitives = deploymentConfigs.toPrimitives();
    }
}