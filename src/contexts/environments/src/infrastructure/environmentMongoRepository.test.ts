import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import EnvironmentMongoRepository from "./environmentMongoRepository";
import EnvironmentMother from "@src/domain/environment.mother";
import UuidMother from "@context/shared/domain/uuid.mother";
import EnvironmentsMother from '@src/domain/environments.mother';

const client = MongoClientFactory.createClient(
    'environments',
    {
        url: process.env.MONGODB_URI || 'mongodb://localhost:27018/'
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
        
    it('should create an environment', async () => {
        expect.hasAssertions()
        await repository.create(EnvironmentMother.random());
        expect(true).toBe(true);
    });

    describe('find', () => {

        it("should return an environment by id", async () => {
            expect.hasAssertions()

            const environment = EnvironmentMother.random();
            
            await repository.create(environment);
            const result = await repository.find(environment.id);

            expect(result).toStrictEqual(environment);
        });
    
        it("should return null if the environment doesn't exist", async () => {
            expect.hasAssertions()

            const result = await repository.find(UuidMother.random());

            expect(result).toBeNull();
        });

    });

    describe('delete', () => {
        it("should delete a environment", async () => {
            expect.hasAssertions();

            const environment = EnvironmentMother.random();

            await repository.create(environment);
            await repository.delete(environment);
            const result = await repository.find(environment.id);

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it("should update a environment", async () => {
            expect.hasAssertions();

            const environment = EnvironmentMother.random(),
                toUpdate = EnvironmentMother.random({id: environment.id.value}),
                environmentMerged = EnvironmentMother.merge(environment, toUpdate);

            await repository.create(environment);
            await repository.update(environmentMerged);

            const result = await repository.find(environment.id);
            expect(result).toStrictEqual(environmentMerged);
        })
    });

    describe('search', () => {
        it("should return an empty array if there are no environments", async ()=> {
            expect.hasAssertions();

            await repository.dropCollection();

            const result = await repository.search({});

            expect(result).toStrictEqual(EnvironmentsMother.empty());

        });

        it('should list all the environments stored', async ()=> {
            expect.hasAssertions();

            await repository.dropCollection();

            const environments = EnvironmentsMother.random();

            await Promise.all(
                environments.map((environment) => repository.create(environment))
            );

            const result = await repository.search({});

            expect(result).toStrictEqual(environments);
        });

        it("should not return more than the limit", async ()=> {
            expect.hasAssertions();

            await repository.dropCollection();
            const environments = EnvironmentsMother.randomWithSize(11);

            await new Promise(resolve => setTimeout(resolve, 1)); //TODO find a better solution. @Documents for more information

            await Promise.all(
                environments.map((environment) => repository.create(environment))
            );

            const result = await repository.search({ page_size: 10 });

            expect(result).toHaveLength(10);
        });
    });
});