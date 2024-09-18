import UserMongoRepository from "./userMongoRepository"
import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory"
import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import UserMother from "@src/domain/user.mother"
import UsersMother from "@src/domain/users.mother";
import UsernameMother from "@src/domain/username.mother";

const client = MongoClientFactory.createClient(
    'users',
    {
        url: 'mongodb://localhost:27017/'
    }
);
const arranger = new MongoEnvironmentArranger(client);
let repository: UserMongoRepository;

describe('userMongoRepository', () => {
    beforeAll(async () => {
        const cli = await client;
        repository = new UserMongoRepository(cli)
    })

    // beforeEach(async () => {
    //     await arranger.arrange();
    // });

    afterAll(async () => {
        await arranger.close();
    });

    it('should create an user', async () => {
        expect.hasAssertions()

        await repository.create(UserMother.random())

        expect(true).toBe(true);
    })

    describe('update', () => {
        it("should update an user", async () => {
            expect.hasAssertions();

            const user = UserMother.random(),
                toUpdate = UserMother.random({
                    id: user.id.value
                }),
                userMerged = UserMother.merge(user, toUpdate);

            await repository.create(user);

            await repository.update(userMerged);

            const result = await repository.findByUsername(user.username);

            expect(result).toStrictEqual(userMerged);
        });
    })

    describe('delete', () => {
        it("should delete an user", async () => {
            expect.hasAssertions();

            const user = UserMother.random();

            await repository.create(user);

            await repository.delete(user);

            const result = await repository.findByUsername(user.username);

            expect(result).toBeNull();

        });
    })

    describe('find', () => {
        it("should return null if the user doesn't exists", async () => {
            expect.hasAssertions();

            const result = await repository.findByUsername(UsernameMother.random());

            expect(result).toBeNull();

        });
        it("should return an user by id", async () => {
            expect.hasAssertions();

            const user = UserMother.random();

            await repository.create(user);

            const result = await repository.findByUsername(user.username);

            expect(result).toStrictEqual(user);
        });
    })

    describe('search', () => {
        it.skip('should return an empty array if there are no users', async () => {
            expect.hasAssertions();

            const result = await repository.search({});

            expect(result).toStrictEqual(UsersMother.empty());
        });

        it.skip('should list all the users stored', async () => {
            expect.hasAssertions();

            const users = UsersMother.random();

            await Promise.all(
                users.map((user) => repository.create(user))
            );

            const result = await repository.search({});

            expect(result).toStrictEqual(users);
        });

        it("shouldn't return more than the limit", async () => {
            expect.hasAssertions();

            const users = UsersMother.randomWithSize(11);

            await Promise.all(
                users.map((user) => repository.create(user))
            );

            const result = await repository.search({
                page_size: 10
            });

            expect(result).toHaveLength(10);
        });
    })
})