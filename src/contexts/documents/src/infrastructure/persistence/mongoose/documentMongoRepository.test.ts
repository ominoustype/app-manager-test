import DocumentMongoRepository from "./documentMongoRepository"
import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory"
import DocumentMother from "@src/domain/document.mother"

describe('documentMongoRepository', () => {
    it('should create a document', async () => {
        //    expect.hasAssertions()
        
        const client = await MongoClientFactory.createClient(
            'document',
            {
                url: 'mongodb://localhost:27017/'
            }
        )

        const repository = new DocumentMongoRepository(client)

        await repository.create(DocumentMother.random())

    })

    describe('find', () => {
        it.todo("should return null if the document doesn't exists");
        it.todo("should return a document by id");
    })


    // it('should do whatever i want to do', async () => {
    //     expect.hasAssertions()
    //     const client = await MongoClientFactory.createClient(
    //         'document',
    //         {
    //             url: 'mongodb://localhost:27017/'
    //         }
    //     )

    //     const repository = new DocumentMongoRepository(client)

    //     await repository.find(new DocumentId(UuidMother.random().value));
    // })
})