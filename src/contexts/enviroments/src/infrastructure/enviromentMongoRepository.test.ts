import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import EnviromentMongoRepository from "./enviromentMongoRepository";
import EnviromentMother from "@src/domain/enviroment.mother";
import UuidMother from "@context/shared/domain/uuid.mother";

const client = MongoClientFactory.createClient(
    'mongoClientAppManager',
    {
        url: 'mongodb://0.0.0.0:27017/'
    }
);
const arranger = new MongoEnvironmentArranger(client);
let repository: EnviromentMongoRepository;

describe('enviromentMongoRepository', () => {

    beforeAll(async () => {
        const cli = await client;
        repository = new EnviromentMongoRepository(cli)
    });

    afterAll(async () => {
        await arranger.close();
    });
        
    it('should create an enviroment', async () => {
        //expect.hasAssertions()
        await repository.create(EnviromentMother.random());
    });

    describe('find', () => {

        it("should return an enviroment by id", async () => {
            //expect.hasAssertions()

            const enviroment = EnviromentMother.random();
            
            await repository.create(enviroment);
            const result = await repository.find(enviroment.id);

            if(result!==null)
                console.log("Integration test Enviroment/find by id: \n"+JSON.stringify(result, null, '\t'));
        });
    
        it("should return null if the enviroment doesn't exist", async () => {
            //expect.hasAssertions()

            const result = await repository.find(UuidMother.random());

            console.log("Integration test Enviroment/find does not exist: \n"+result)
        });

    });

    describe('delete', () => {
        it("should delete a Enviroment", async () => {
            // expect.hasAssertions();

            const document = EnviromentMother.random();

            await repository.create(document);
            await repository.delete(document);
            const result = await repository.find(document.id);

            console.log("Integration test Enviroment/delete: \n"+result)
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it("should update a Enviroment", async () => {
            //expect.hasAssertions();

            const enviroment = EnviromentMother.random();
            const toUpdate = EnviromentMother.random({id: enviroment.id.value});
            const enviromentMerged = EnviromentMother.merge(enviroment, toUpdate);

            await repository.create(enviroment);
            await repository.update(enviromentMerged);

            const result = await repository.find(enviroment.id);
            if(result!==null)
                console.log("Integration test Enviroment/update: \n"+JSON.stringify(result, null, '\t'));
        })
    });
});