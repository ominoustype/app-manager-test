import { Nullable } from '@context/shared/domain/nullable';
import { omit } from 'lodash';
import Uuid from '@context/shared/domain/uuid';
import DeploymentConfigs from '@src/domain/deploymentConfigs';
import DeploymentsConfigs from '@src/domain/deploymentsConfigs';
import DeploymentConfigsRepository from '@src/domain/deploymentConfigsRepository';
import { SearchDeploymentsConfigsQueryParams } from '@src/application/search/searchDeploymentsConfigsQuery';

export default class DeploymentConfigsRepositoryMock implements DeploymentConfigsRepository {
    private mockCreate = jest.fn();
    private mockFind = jest.fn();
    private mockDelete = jest.fn();
    private mockUpdate = jest.fn();
    private mockSearch = jest.fn();

    async find(id: Uuid): Promise<Nullable<DeploymentConfigs>> {
        return this.mockFind(id);
    }

    create(deploymentConfigs: DeploymentConfigs) {
        return this.mockCreate(deploymentConfigs);
    }

    delete(deploymentConfigs: DeploymentConfigs): Promise<void> {
        return this.mockDelete(deploymentConfigs);
    }

    update(deploymentConfigs: DeploymentConfigs): Promise<void> {
        return this.mockUpdate(deploymentConfigs);
    }

    async search(params: SearchDeploymentsConfigsQueryParams): Promise<DeploymentsConfigs> {
        return this.mockSearch(params);
    }

    assertCreateHasBeenCalledWith(deploymentConfigs: DeploymentConfigs, exclusions: Array<string>) {
        const { mock } = this.mockCreate,
            lastDeploymentConfigsCreated = mock.calls[mock.calls.length - 1][0],
            lastDeploymentConfigsCreatedPrimitives = omit(
                lastDeploymentConfigsCreated.toPrimitives(),
                exclusions ?? []
            ),
            expectedBody = omit(deploymentConfigs.toPrimitives(), exclusions ?? []);

        expect(lastDeploymentConfigsCreatedPrimitives).toStrictEqual(expectedBody);
    }

    async assertFindHasBeenCalledWith(id: Uuid): Promise<void> {
        expect(this.mockFind).toHaveBeenCalledWith(id);
    }

    async whenFindThenReturn(deploymentConfigs: Nullable<DeploymentConfigs>): Promise<void> {
        this.mockFind.mockReturnValue(Promise.resolve(deploymentConfigs));
    }

    async assertDeleteHasBeenCalledWith(deploymentConfigs: DeploymentConfigs): Promise<void> {
        expect(this.mockDelete).toHaveBeenCalledWith(deploymentConfigs);
    }
    
    async assertUpdateHasBeenCalledWith(deploymentConfigs: DeploymentConfigs): Promise<void> {
        expect(this.mockUpdate).toHaveBeenCalledWith(deploymentConfigs);
    }

    async whenSearchThenReturn(deploymentsConfigs: DeploymentsConfigs): Promise<void> {
        this.mockSearch.mockReturnValue(deploymentsConfigs);
    }

    async assertSearchHasBeenCalledWith(params: SearchDeploymentsConfigsQueryParams): Promise<void> {
        expect(this.mockSearch).toHaveBeenCalledWith(params);
    }
}