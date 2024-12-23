import UuidMother from "@context/shared/domain/uuid.mother";
import FindDeploymentConfigsQuery, { FindDeploymentConfigsQueryParams, FindDeploymentConfigsQueryPermissions } from "@src/application/find/findDeploymentConfigsQuery";
import DeploymentConfigs from "@src/domain/deploymentConfigs";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";
import EnvironmentIdMother from "@src/domain/environment/environmentId.mother";

export default class FindDeploymentConfigsQueryMother{
    static create(params: FindDeploymentConfigsQueryParams, permissions: FindDeploymentConfigsQueryPermissions): 
        FindDeploymentConfigsQuery{
        return new FindDeploymentConfigsQuery(params, permissions);
    }

    static random(): FindDeploymentConfigsQuery{
        return FindDeploymentConfigsQueryMother.create({
            id: UuidMother.random().toString()
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        });
    }

    static randomDeploymentConfigs(query: FindDeploymentConfigsQuery): DeploymentConfigs{
        const id = UuidMother.create(query.id).toString();

        return DeploymentConfigsMother.random({id});
    }
}