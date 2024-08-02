import UuidMother from "@context/shared/domain/uuid.mother";
import FindDeploymentConfigsQuery, { FindDeploymentConfigsQueryParams } from "@src/application/find/findDeploymentConfigsQuery";
import DeploymentConfigs from "@src/domain/deploymentConfigs";
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother";

export default class FindDeploymentConfigsQueryMother{
    static create(params: FindDeploymentConfigsQueryParams): FindDeploymentConfigsQuery{
        return new FindDeploymentConfigsQuery(params);
    }

    static random(): FindDeploymentConfigsQuery{
        return FindDeploymentConfigsQueryMother.create({
            id: UuidMother.random().toString()
        });
    }

    static randomDeploymentConfigs(query: FindDeploymentConfigsQuery): DeploymentConfigs{
        const id = UuidMother.create(query.id).toString();

        return DeploymentConfigsMother.random({id});
    }
}