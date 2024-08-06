import DeploymentConfigs, { DeploymentConfigsPrimitives }  from "@src/domain/deploymentConfigs";
import FindDeploymentConfigsResponse from "@src/application/find/findDeploymentConfigsResponse";

export default class FindDeploymentConfigsResponseMother{
    static create(primitives: DeploymentConfigsPrimitives): FindDeploymentConfigsResponse{
        return new FindDeploymentConfigsResponse(new DeploymentConfigs(primitives));
    }
}