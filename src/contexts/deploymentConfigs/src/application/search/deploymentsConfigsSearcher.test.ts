import DeploymentConfigsRepositoryMock from "@src/__mock__/deploymentConfigsRepository";
import SearchDeploymentsConfigsQueryHandler from "./searchDeploymentsConfigsQueryHandler";
import DeploymentsConfigsSearcher from "./deploymentsConfigsSearcher";
import SearchDeploymentsConfigsQueryMother from "./searchDeploymentsConfigsQuery.mother";
import SearchDeploymentsConfigsResponseMother from "./searchDeploymentsConfigsResponse.mother";
import DeploymentsConfigsMother from "@src/domain/deploymentsConfigs.mother";

describe('deploymentsConfigsSearcher', () => {
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            handler = new SearchDeploymentsConfigsQueryHandler(
                new DeploymentsConfigsSearcher(repository)
            ),
            query = SearchDeploymentsConfigsQueryMother.random();

        repository.whenSearchThenReturn(DeploymentsConfigsMother.random());

        await handler.handle(query);

        repository.assertSearchHasBeenCalledWith(query.params);
    });

    it('should return an empty response when there are no deploymentsConfigs', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            handler = new SearchDeploymentsConfigsQueryHandler(
                new DeploymentsConfigsSearcher(repository)
            ),
            query = SearchDeploymentsConfigsQueryMother.random();

        repository.whenSearchThenReturn(DeploymentsConfigsMother.empty());

        const response = await handler.handle(query);

        expect(response).toStrictEqual(SearchDeploymentsConfigsResponseMother.empty());
    });
    
    it('should return a response with deploymentsConfigs when there are deploymentsConfigs', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            handler = new SearchDeploymentsConfigsQueryHandler(
                new DeploymentsConfigsSearcher(repository)
            ),
            query = SearchDeploymentsConfigsQueryMother.random(),
            deploymentsConfigs = DeploymentsConfigsMother.random(),
            expected = SearchDeploymentsConfigsResponseMother.fromDeploymentsConfigs(deploymentsConfigs);

        repository.whenSearchThenReturn(deploymentsConfigs);

        const response = await handler.handle(query);

        expect(response).toStrictEqual(expected);
    });
});