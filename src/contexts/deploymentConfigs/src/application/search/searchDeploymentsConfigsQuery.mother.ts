import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";
import SearchDeploymentsConfigsQuery, { SearchDeploymentConfigsQueryPermissions, SearchDeploymentsConfigsQueryParams } from "./searchDeploymentsConfigsQuery";

export default class SearchDeploymentsConfigsQueryMother {
    static create(params: SearchDeploymentsConfigsQueryParams, permissions: SearchDeploymentConfigsQueryPermissions): 
        SearchDeploymentsConfigsQuery{
        return new SearchDeploymentsConfigsQuery(params, permissions);
    }

    static random(): SearchDeploymentsConfigsQuery{
        return SearchDeploymentsConfigsQueryMother.create({}, {
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        });
    }
}