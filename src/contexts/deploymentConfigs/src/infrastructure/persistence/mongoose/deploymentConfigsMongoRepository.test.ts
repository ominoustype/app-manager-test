import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory"
import DeploymentConfigsMongoRepository from "./deploymentConfigsMongoRepository"
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother"
import UuidMother from "@context/shared/domain/uuid.mother";
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import DeploymentsConfigsMother from '@src/domain/deploymentsConfigs.mother';

const client = MongoClientFactory.createClient(
    'deploymentConfigs',
    {
        url: 'mongodb://0.0.0.0:27017/'
    }
);
const arranger = new MongoEnvironmentArranger(client);
let repository: DeploymentConfigsMongoRepository;

describe('deploymentConfigsMongoRepository', () => {
    beforeAll(async () => {
        const cli = await client;
        repository = new DeploymentConfigsMongoRepository(cli);
    });

    afterAll(async () => {
        await arranger.close();
    });
        
    it('should create a deploymentConfigs', async () => {
        expect.hasAssertions()
        await repository.create(DeploymentConfigsMother.random());
        expect(true).toBe(true);
    });

    describe('find', () => {
        it("should return a deploymentConfigs by id", async () => {
            expect.hasAssertions()

            const deploymentConfigs = DeploymentConfigsMother.random();
            await repository.create(deploymentConfigs);
            const result = await repository.find(deploymentConfigs.id);

            expect(result).toStrictEqual(deploymentConfigs);
        });
    
        it("should return null if the deploymentConfigs doesn't exist", async () => {
            expect.hasAssertions()

            const result = await repository.find(UuidMother.random());

            expect(result).toBeNull();
        });

    });

    describe('delete', () => {
        it("should delete a deploymentConfigs", async () => {
            expect.hasAssertions();

            const deploymentsConfig = DeploymentConfigsMother.random();

            await repository.create(deploymentsConfig);
            await repository.delete(deploymentsConfig);
            const result = await repository.find(deploymentsConfig.id);

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it("should update a deploymentConfigs", async () => {
            expect.hasAssertions();

            const deploymentConfigs = DeploymentConfigsMother.random(),
                toUpdate = DeploymentConfigsMother.random({id: deploymentConfigs.id.value}),
                deploymentConfigsMerged = DeploymentConfigsMother.merge(deploymentConfigs, toUpdate);

            await repository.create(deploymentConfigs);
            await repository.update(deploymentConfigsMerged);

            const result = await repository.find(deploymentConfigs.id);
           
            expect(result).toStrictEqual(deploymentConfigsMerged);
        })
    });

    describe('search', () => {
        it.skip("should return an empty array if there are no deploymentConfigs", async () => {
            expect.hasAssertions();

            const result = await repository.search({});

            expect(result).toStrictEqual(DeploymentsConfigsMother.empty());
        });

        it.skip("should list all the deploymentConfigs stored", async() => {
            expect.hasAssertions();

            const deploymentsConfigs = DeploymentsConfigsMother.random();

            await Promise.all(
                deploymentsConfigs.map((deploymentConfig) => repository.create(deploymentConfig))
            );

            const result = await repository.search({});
            expect(result).toStrictEqual(deploymentsConfigs);
        });

        it.skip("should not return more than the limit", async() => {
            expect.hasAssertions();

            const deploymentsConfigs = DeploymentsConfigsMother.randomWithSize(11);

            await Promise.all(
                deploymentsConfigs.map((deploymentConfigs) => repository.create(deploymentConfigs))
            );

            const result = await repository.search({ page_size: 10 })
            expect(result).toHaveLength(10);
        });
    });
});