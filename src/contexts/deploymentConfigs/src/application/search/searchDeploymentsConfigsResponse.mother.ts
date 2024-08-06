import DeploymentsConfigs, { DeploymentsConfigsPrimitives } from "@src/domain/deploymentsConfigs";
import SearchDeploymentsConfigsResponse from "./searchDeploymentsConfigsResponse";
import DeploymentsConfigsMother from '@src/domain/deploymentsConfigs.mother';

export default class SearchDeploymentsConfigsResponseMother{
    static create(primitives: DeploymentsConfigsPrimitives): SearchDeploymentsConfigsResponse{
        return new SearchDeploymentsConfigsResponse(new DeploymentsConfigs(primitives));
    }

    static fromDeploymentsConfigs(deploymentsConfigs: DeploymentsConfigs){
        return SearchDeploymentsConfigsResponseMother.create(
            deploymentsConfigs.toPrimitives());
    }

    static empty(){
        return SearchDeploymentsConfigsResponseMother.fromDeploymentsConfigs(
            DeploymentsConfigsMother.empty());
    }
}