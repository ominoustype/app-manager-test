import { Nullable } from "@context/shared/domain/nullable";
import { SearchDeploymentsConfigsQueryParams } from "@src/application/search/searchDeploymentsConfigsQuery";
import DeploymentConfigs from '@src/domain/deploymentConfigs';
import DeploymentConfigsId from "@src/domain/deploymentConfigsId";
import DeploymentsConfigs from '@src/domain/deploymentsConfigs';

interface DeploymentConfigsRepository{
    find(id: DeploymentConfigsId): Promise<Nullable<DeploymentConfigs>>;

    create(deploymentConfigs: DeploymentConfigs): Promise<void>;

    delete(deploymentConfigs: DeploymentConfigs): Promise<void>;

    update(deploymentConfigs: DeploymentConfigs): Promise<void>;

    search(params: SearchDeploymentsConfigsQueryParams): Promise<DeploymentsConfigs>;
}

export default DeploymentConfigsRepository;