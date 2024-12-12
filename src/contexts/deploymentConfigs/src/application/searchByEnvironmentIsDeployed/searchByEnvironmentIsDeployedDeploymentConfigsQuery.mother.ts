import UuidMother from "@context/shared/domain/uuid.mother";
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery, 
{ SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams } from "./searchByEnvironmentIsDeployedDeploymentConfigsQuery";

export default class SearchByEnvironmentIsDeployedDeploymentConfigsQueryMother {
    static create(params: SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams):  SearchByEnvironmentIsDeployedDeploymentConfigsQuery{
        return new SearchByEnvironmentIsDeployedDeploymentConfigsQuery(params);
    }

    static random(): SearchByEnvironmentIsDeployedDeploymentConfigsQuery{
        return SearchByEnvironmentIsDeployedDeploymentConfigsQueryMother.create({
            environmentId: UuidMother.random().value,
            isDeployed: false
        });
    }
}