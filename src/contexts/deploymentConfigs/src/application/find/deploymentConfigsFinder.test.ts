import DeploymentConfigsRepositoryMock from "@src/__mock__/deploymentConfigsRepository";
import FindDeploymentConfigsQueryHandler from "./findDeploymentConfigsQueryHandler";
import DeploymentConfigsFinder from "./deploymentConfigsFinder";
import FindDeploymentConfigsQueryMother from "./findDeploymentConfigsQuery.mother";
import FindDeploymentConfigsResponseMother from "./findDeploymentConfigsResponse.mother";
import DeploymentConfigsNotFoundError from "@src/domain/errors/deploymentConfigsNotFoundError";
import Uuid from "@context/shared/domain/uuid";

describe('deploymentConfigs', () => {
    it('should call the repo with the id', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock();
        const handler = new FindDeploymentConfigsQueryHandler(
                        new DeploymentConfigsFinder(repository)
                        );

        const query = FindDeploymentConfigsQueryMother.random();
        const deploymentConfigs = FindDeploymentConfigsQueryMother.randomDeploymentConfigs(query);

        repository.whenFindThenReturn(deploymentConfigs);

        await handler.handle(query);

        repository.assertFindHasBeenCalledWith(new Uuid(query.id));
    });

    it('should find a deploymentConfig', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock();
        const handler = new FindDeploymentConfigsQueryHandler(
                        new DeploymentConfigsFinder(repository)
                        );

        const query = FindDeploymentConfigsQueryMother.random();
        const deploymentConfigs = FindDeploymentConfigsQueryMother.randomDeploymentConfigs(query);
        const expected = FindDeploymentConfigsResponseMother.create(deploymentConfigs.toPrimitives());

        repository.whenFindThenReturn(deploymentConfigs);

        const response = await handler.handle(query);
        
        expect(response).toStrictEqual(expected);
    });

    it('should throw a DeploymentConfigsNotFoundError when the deploymentConfigs does not exist', async() => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock();
        const handler = new FindDeploymentConfigsQueryHandler(
                        new DeploymentConfigsFinder(repository)
                        );

        const query = FindDeploymentConfigsQueryMother.random();

        repository.whenFindThenReturn(null);

        try{
            await handler.handle(query);
        }
        catch(e){
            expect(e).toBeInstanceOf(DeploymentConfigsNotFoundError);
        }

    });
});