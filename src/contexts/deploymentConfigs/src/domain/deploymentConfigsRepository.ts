import { Nullable } from "@context/shared/domain/nullable";
import { SearchDeploymentsConfigsQueryParams } from "@src/application/search/searchDeploymentsConfigsQuery";
import { SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams } from "@src/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery";
import DeploymentConfigs from '@src/domain/deploymentConfigs';
import DeploymentConfigsId from "@src/domain/deploymentConfigsId";
import DeploymentsConfigs from '@src/domain/deploymentsConfigs';

interface DeploymentConfigsRepository{
    find(id: DeploymentConfigsId): Promise<Nullable<DeploymentConfigs>>;

    findByIdAndEnvironmentIds(id: DeploymentConfigsId, environmentIds: Array<string>):  Promise<Nullable<DeploymentConfigs>>;

    searchByEnvironmentIsDeployed(params: SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams): Promise<DeploymentsConfigs>;

    create(deploymentConfigs: DeploymentConfigs): Promise<void>;

    delete(deploymentConfigs: DeploymentConfigs): Promise<void>;

    update(deploymentConfigs: DeploymentConfigs): Promise<void>;

    search(params: SearchDeploymentsConfigsQueryParams, environmentIds: Array<string>): Promise<DeploymentsConfigs>;

    deploy(deploymentConfigs: DeploymentConfigs): Promise<void>;
}

export default DeploymentConfigsRepository;