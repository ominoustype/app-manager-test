import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import CustomerMongoRepository from "./customerMongoRepository";
import UuidMother from "@context/shared/domain/uuid.mother";
import CustomerMother from '@src/domain/customer.mother';
import CustomersMother from "@src/domain/customers.mother";

const client = MongoClientFactory.createClient(
    'customers',
    {
        url: process.env.MONGODB_URI || 'mongodb://localhost:27018/'
    }
);
const arranger = new MongoEnvironmentArranger(client);
let repository: CustomerMongoRepository;

describe('customerMongoRepository', () => {
    beforeAll(async () => {
        const cli = await client;
        repository = new CustomerMongoRepository(cli)
    });

    afterAll(async () => {
        await arranger.close();
    });

    describe('find', () => {

        it("should return a Customer by id", async () => {
            expect.hasAssertions()

            const customer = CustomerMother.random();
            
            await repository.create(customer);
            const result = await repository.find(customer.id);

            expect(result).toStrictEqual(customer);
        });
    
        it("should return null if the customer doesn't exist", async () => {
            expect.hasAssertions()

            const result = await repository.find(UuidMother.random());

            expect(result).toBeNull();
        });

    });

    describe('search', () => {
        it("should return an empty array if there are no customers", async ()=> {
            expect.hasAssertions();

            await repository.dropCollection();

            const result = await repository.search({});

            expect(result).toStrictEqual(CustomersMother.empty());

        });

        it('should list all the customers stored', async ()=> {
            expect.hasAssertions();

            await repository.dropCollection();

            const customers = CustomersMother.random();

            await Promise.all(
                customers.map((customers) => repository.create(customers))
            );

            const result = await repository.search({});

            expect(result).toStrictEqual(customers);
        });
    });
});