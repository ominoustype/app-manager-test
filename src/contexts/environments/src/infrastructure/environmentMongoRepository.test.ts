import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import EnvironmentMongoRepository from "./environmentMongoRepository";
import EnvironmentMother from "@src/domain/environment.mother";
import UuidMother from "@context/shared/domain/uuid.mother";

const client = MongoClientFactory.createClient(
    'mongoClientAppManager',
    {
        url: 'mongodb://0.0.0.0:27017/'
    }
);
const arranger = new MongoEnvironmentArranger(client);
let repository: EnvironmentMongoRepository;

describe('environmentMongoRepository', () => {

    beforeAll(async () => {
        const cli = await client;
        repository = new EnvironmentMongoRepository(cli)
    });

    afterAll(async () => {
        await arranger.close();
    });
        
    it('should create an Environment', async () => {
        //expect.hasAssertions()
        await repository.create(EnvironmentMother.random());
    });

    describe('find', () => {

        it("should return an Environment by id", async () => {
            //expect.hasAssertions()

            const environment = EnvironmentMother.random();
            
            await repository.create(environment);
            const result = await repository.find(environment.id);

            if(result!==null)
                console.log("Integration test Environment/find by id: \n"+JSON.stringify(result, null, '\t'));
        });
    
        it("should return null if the Environment doesn't exist", async () => {
            //expect.hasAssertions()

            const result = await repository.find(UuidMother.random());

            console.log("Integration test Environment/find does not exist: \n"+result)
        });

    });

    describe('delete', () => {
        it("should delete a Environment", async () => {
            // expect.hasAssertions();

            const document = EnvironmentMother.random();

            await repository.create(document);
            await repository.delete(document);
            const result = await repository.find(document.id);

            console.log("Integration test Environment/delete: \n"+result)
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it("should update a Environment", async () => {
            //expect.hasAssertions();

            const environment = EnvironmentMother.random();
            const toUpdate = EnvironmentMother.random({id: environment.id.value});
            const environmentMerged = EnvironmentMother.merge(environment, toUpdate);

            await repository.create(environment);
            await repository.update(environmentMerged);

            const result = await repository.find(environment.id);
            if(result!==null)
                console.log("Integration test Environment/update: \n"+JSON.stringify(result, null, '\t'));
        })
    });
});