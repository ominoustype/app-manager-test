import DeploymentConfigsRepositoryMock from "@src/__mock__/deploymentConfigsRepository";
import SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler from "./searchByEnvironmentIsDeployedDeploymentConfigsQueryHandler";
import DeploymentConfigsByEnvironmentIsDeployedSearcher from "./deploymentConfigsByEnvironmentIsDeployedSearcher";
import SearchByEnvironmentIsDeployedDeploymentConfigsQueryMother from "./searchByEnvironmentIsDeployedDeploymentConfigsQuery.mother";
import DeploymentsConfigsMother from "@src/domain/deploymentsConfigs.mother";
import SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother from "./searchByEnvironmentIsDeployedDeploymentConfigsResponse.mother";

describe('deploymentsConfigsByEnvironmentIsDeployedSearcher', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            handler = new SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler(
                new DeploymentConfigsByEnvironmentIsDeployedSearcher(repository)
            ),
            query = SearchByEnvironmentIsDeployedDeploymentConfigsQueryMother.random();

        repository.whenSearchByEnvironmentIsDeployedThenReturn(DeploymentsConfigsMother.random());

        await handler.handle(query);

        repository.assertSearchByEnvironmentIsDeployedHasBeenCalledWith(query.params);
    });

    it('should return an empty response when there are no deploymentsConfigs', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            handler = new SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler(
                new DeploymentConfigsByEnvironmentIsDeployedSearcher(repository)
            ),
            query = SearchByEnvironmentIsDeployedDeploymentConfigsQueryMother.random();

        repository.whenSearchByEnvironmentIsDeployedThenReturn(DeploymentsConfigsMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.empty());
    });
    
    it('should return a response with deploymentsConfigs when there are deploymentsConfigs', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            handler = new SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler(
                new DeploymentConfigsByEnvironmentIsDeployedSearcher(repository)
            ),
            query = SearchByEnvironmentIsDeployedDeploymentConfigsQueryMother.random(),
            deploymentsConfigs = DeploymentsConfigsMother.random(),
            expected = SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.fromDeploymentConfigs(deploymentsConfigs);

        repository.whenSearchByEnvironmentIsDeployedThenReturn(deploymentsConfigs);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
});