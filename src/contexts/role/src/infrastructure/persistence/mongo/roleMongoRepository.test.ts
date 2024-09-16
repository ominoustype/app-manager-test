import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import RoleMongoRepository from "./roleMongoRepository";
import RoleMother from "@src/domain/role.mother";
import UuidMother from "@context/shared/domain/uuid.mother";
import RolesMother from "@src/domain/roles.mother";

const client = MongoClientFactory.createClient(
    'role',
    {
        url: 'mongodb://localhost:27018/'
    }
);
const arranger = new MongoEnvironmentArranger(client);
let repository: RoleMongoRepository;

describe('roleMongoRepository', () => {
    beforeAll(async () => {
        const cli = await client;
        repository = new RoleMongoRepository(cli);
    });

    afterAll(async () => {
        await arranger.close();
    });

    it('should create an environment', async () => {
        expect.hasAssertions();

        await repository.create(RoleMother.random());

        expect(true).toBe(true);
    });

    describe('find', () => {
        it("should return a role by id", async() => {
            expect.hasAssertions();

            const role = RoleMother.random();

            await repository.create(role);

            const result = await repository.find(role.id);

            expect(role).toStrictEqual(result);
        });

        it("should return null if the role does not exist", async() => {
            expect.hasAssertions();

            const result = await repository.find(UuidMother.random());

            expect(result).toBeNull();
        });
    });

    describe('delete', () => {
        it("should delete a role", async() => {
            expect.hasAssertions();

            const role = RoleMother.random();

            await repository.create(role);

            await repository.delete(role);

            const result = await repository.find(role.id);

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it("should update a role", async () => {
            expect.hasAssertions();

            const oldRole = RoleMother.random(),
                role = RoleMother.random({
                    id: oldRole.id.value
                }),
                mergedRole = RoleMother.merge(oldRole, role);

            await repository.create(oldRole);

            await repository.update(mergedRole);

            const result = await repository.find(oldRole.id);

            expect(mergedRole).toStrictEqual(result);
        });
    });

    describe('search', () => {
        it('should return an empty array if there are no roles', async () => {
            expect.hasAssertions();

            await repository.dropCollection();

            const result = await repository.search({});

            expect(result).toStrictEqual(RolesMother.empty());
        });

        it('should list all the roles stored', async () => {
            expect.hasAssertions();

            await repository.dropCollection();

            const roles = RolesMother.random();

            await Promise.all(
                roles.map((role) => repository.create(role))
            );

            const result = await repository.search({});

            expect(result).toStrictEqual(roles);
        });

        /*it("should return roles matching the search criteria", async () => {
            expect.hasAssertions();

            await repository.dropCollection();

            const roles = RoleMother.randomListWithSize(10),
                searchParams = {
                    name: roles[0].name
                };

            await Promise.all(roles.map(role => repository.create(role)));

            const result = await repository.search(searchParams);

            expect(result).toStrictEqual(roles[0]);
        });*/

        /*it.skip("should return an empty array if there are no roles matching the search criteria", async () => {
            expect.hasAssertions();

            const searchParams = {
                name: 'non-existent-role'
            };

            const result = await repository.search(searchParams);

            expect(result).toStrictEqual([]);
        });*/
    });
});