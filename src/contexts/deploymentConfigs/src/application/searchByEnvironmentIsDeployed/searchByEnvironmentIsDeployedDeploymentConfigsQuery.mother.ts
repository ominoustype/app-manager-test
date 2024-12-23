import UuidMother from "@context/shared/domain/uuid.mother";
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery, 
{ SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams, SearchByEnvironmentIsDeployedDeploymentConfigsQueryPermissions } from "./searchByEnvironmentIsDeployedDeploymentConfigsQuery";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class SearchByEnvironmentIsDeployedDeploymentConfigsQueryMother {
    static create(params: SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams, 
        permissions: SearchByEnvironmentIsDeployedDeploymentConfigsQueryPermissions):  SearchByEnvironmentIsDeployedDeploymentConfigsQuery{
        return new SearchByEnvironmentIsDeployedDeploymentConfigsQuery(params, permissions);
    }

    static random(): SearchByEnvironmentIsDeployedDeploymentConfigsQuery{
        return SearchByEnvironmentIsDeployedDeploymentConfigsQueryMother.create({
            environmentId: UuidMother.random().value,
            isDeployed: false
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        });
    }
}