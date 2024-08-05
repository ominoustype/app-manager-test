import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory"
import DeploymentConfigsMongoRepository from "./deploymentConfigsMongoRepository"
import DeploymentConfigsMother from "@src/domain/deploymentConfigs.mother"
import UuidMother from "@context/shared/domain/uuid.mother";
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";

const client = MongoClientFactory.createClient(
    'mongoClientAppManager',
    {
        url: 'mongodb://0.0.0.0:27017/'
    }
);
const arranger = new MongoEnvironmentArranger(client);
let repository: DeploymentConfigsMongoRepository;

describe('deploymentConfigsMongoRepository', () => {

    beforeAll(async () => {
        const cli = await client;
        repository = new DeploymentConfigsMongoRepository(cli)
    });

    afterAll(async () => {
        await arranger.close();
    });
        
    it('should create a deploymentConfigs', async () => {
        //expect.hasAssertions()
        await repository.create(DeploymentConfigsMother.random());
    });

    describe('find', () => {

        it("should return a deploymentConfigs by id", async () => {
            //expect.hasAssertions()

            const deploymentConfigs = DeploymentConfigsMother.random();
            await repository.create(deploymentConfigs);
            const result = await repository.find(deploymentConfigs.id);

            if(result!==null)
                console.log("Integration test DeploymentConfigs/find by id: \n"+JSON.stringify(result, null, '\t'));
        });
    
        it("should return null if the deploymentConfigs doesn't exist", async () => {
            //expect.hasAssertions()

            const result = await repository.find(UuidMother.random());

            console.log("Integration test DeploymentConfigs/find does not exist: \n"+result)
        });

    });

    describe('delete', () => {
        it("should delete a deploymentConfigs", async () => {
            // expect.hasAssertions();

            const deploiymentsConfig = DeploymentConfigsMother.random();

            await repository.create(deploiymentsConfig);
            await repository.delete(deploiymentsConfig);
            const result = await repository.find(deploiymentsConfig.id);

            console.log("Integration test DeploymentConfigs/delete: \n"+result)
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it("should update a deploymentConfigs", async () => {
            //expect.hasAssertions();

            const deploymentConfigs = DeploymentConfigsMother.random();
            const toUpdate = DeploymentConfigsMother.random({id: deploymentConfigs.id.value});
            const deploymentConfigsMerged = DeploymentConfigsMother.merge(deploymentConfigs, toUpdate);

            await repository.create(deploymentConfigs);
            await repository.update(deploymentConfigsMerged);

            const result = await repository.find(deploymentConfigs.id);
            if(result!==null)
                console.log("Integration test DeploymentConfigs/find by id: \n"+JSON.stringify(result, null, '\t')); 
        })
    });
});