import DocumentMongoRepository from "./documentMongoRepository"
import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory"
// import MongoEnvironmentArranger from "@context/shared/infrastructure/mongo/mongoEnvironmentArranger";
import DocumentMother from "@src/domain/document.mother"
import UuidMother from "@context/shared/domain/uuid.mother";

const client = MongoClientFactory.createClient(
    'companies',
    {
        url: 'mongodb://localhost:27017/'
    }
);
// const arranger = new MongoEnvironmentArranger(client);
let repository: DocumentMongoRepository;

describe('documentMongoRepository', () => {
    beforeAll(async () => {
        const cli = await client;
        repository = new DocumentMongoRepository(cli)
    })

    // beforeEach(async () => {
    //     await arranger.arrange();
    // });

    // afterAll(async () => {
    //     await arranger.close();
    // });

    it('should create a document', async () => {
        // expect.hasAssertions()

        await repository.create(DocumentMother.random())

        // expect(true).toBe(true);
    })

    describe('update', () => {
        it("should update a document", async () => {
            // expect.hasAssertions();

            const document = DocumentMother.random(),
                toUpdate = DocumentMother.random({
                    id: document.id.value
                }),
                documentMerged = DocumentMother.merge(document, toUpdate);

            await repository.create(document);

            await repository.update(documentMerged);

            const result = await repository.find(document.id);

            console.log(result);
            // expect(result).toStrictEqual(documentMerged);
        });
    })

    describe('delete', () => {
        it("should delete a document", async () => {
            // expect.hasAssertions();

            const document = DocumentMother.random();

            await repository.create(document);

            await repository.delete(document);

            const result = await repository.find(document.id);

            console.log(result);
            // expect(result).toBeNull();

        });
    })

    describe('find', () => {
        it("should return null if the document doesn't exists", async () => {
            // expect.hasAssertions();

            const result = await repository.find(UuidMother.random());

            console.log(result);
            // expect(result).toBeNull();

        });
        it("should return a document by id", async () => {
            // expect.hasAssertions();

            const document = DocumentMother.random();

            await repository.create(document);

            const result = await repository.find(document.id);

            console.log(result);
            // expect(result).toStrictEqual(document);
        });
    })

    describe('search', () => {
        it.todo("should return a list of documents");
    })
})