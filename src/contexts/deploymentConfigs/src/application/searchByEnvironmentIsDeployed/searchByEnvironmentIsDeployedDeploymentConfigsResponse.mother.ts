import DeploymentsConfigs, { DeploymentsConfigsPrimitives } from "@src/domain/deploymentsConfigs";
import SearchByEnvironmentIsDeployedDeploymentConfigsResponse from "./searchByEnvironmentIsDeployedDeploymentConfigsResponse";
import DeploymentsConfigsMother from "@src/domain/deploymentsConfigs.mother";

export default class SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother{
    static create(primitives: DeploymentsConfigsPrimitives): SearchByEnvironmentIsDeployedDeploymentConfigsResponse{
        return new SearchByEnvironmentIsDeployedDeploymentConfigsResponse(new DeploymentsConfigs(primitives));
    }

    static fromDeploymentConfigs(deploymentsConfigs: DeploymentsConfigs){
        return SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.create(
            deploymentsConfigs.toPrimitives());
    }

    static empty(){
        return SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.fromDeploymentConfigs(
            DeploymentsConfigsMother.empty());
    }
}