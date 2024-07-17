import MongooseClientFactory from "@context/shared/infrastructure/mongoose/mongooseClientFactory"
import DocumentMongooseRepository from "./documentMongooseRepository"
import DocumentId from "@src/domain/documentId"
import UuidMother from "@context/shared/domain/uuid.mother"

describe('documentMongooseRepository', () => {
    it('should do whatever i want to do', async () => {
        expect.hasAssertions()
        const client = await MongooseClientFactory.createClient(
            'Document',
            {
                connectionUri: 'mongodb://localhost:27017/',
                collection: 'test'
            }
        )

        const repository = new DocumentMongooseRepository(client)

        await repository.find(new DocumentId(UuidMother.random().value));
    })
})