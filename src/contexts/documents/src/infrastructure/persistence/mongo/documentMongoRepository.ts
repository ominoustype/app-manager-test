import Criteria from '@context/shared/domain/criteria/criteria';
import Cursor from '@context/shared/domain/criteria/cursor';
import Filter from '@context/shared/domain/criteria/filter';
import { FilterOperator } from '@context/shared/domain/criteria/filterOperator';
import Filters, { FilterType } from '@context/shared/domain/criteria/filters';
import Orders from '@context/shared/domain/criteria/orders';
import { Nullable } from '@context/shared/domain/nullable';
import MongoRepository from '@context/shared/infrastructure/mongo/mongoRepository';
import { SearchDocumentsQueryParams } from '@src/application/search/searchDocumentsQuery';
import Document from '@src/domain/document';
import DocumentId from '@src/domain/documentId';
import DocumentRepository from '@src/domain/documentRepository';
import Documents from '@src/domain/documents'
import DocumentStatus from '@src/domain/documentStatus';

const TO_SEARCH_PARAMS_DICT = Object.freeze({
    search: ['_id','name'],
    environment: 'environment',
    customer: 'customer'
});

const DEFAULT_PAGE_SIZE = 50;

export default class DocumentMongoRepository extends MongoRepository<Document> implements DocumentRepository {
    protected moduleName(): string {
        return 'documents';
    }

    protected getCursor(item: Document, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            _id: item.id.toString(), 
            isBackward 
        });
    }

    async create(document: Document): Promise<void> {
        await this.persist(document.id.value, document)
    }

    async update(document: Document): Promise<void> {
        await this.persist(document.id.value, document)
    }

    async delete(document: Document): Promise<void> {
        await this.remove(document.id.value);
    }
    
    async logicalDelete(document: Document): Promise<void> {
        const removed = document.toPrimitives();
        removed.status = DocumentStatus.DELETED;

        await this.persist(document.id.value, new Document(removed))
    }

    async restore(document: Document): Promise<void> {
        const restored = document.toPrimitives();
        restored.status = DocumentStatus.DRAFT;

        await this.persist(document.id.value, new Document(restored))
    }
    
    async find(id: DocumentId): Promise<Nullable<Document>> {
        return this.byId(id.value, Document.fromPrimitives);
    }

    async search(params: SearchDocumentsQueryParams = {}): Promise<[Documents, count: number]> {
        const copyParams = { ...params };
        const limit: number = params.page_size && !isNaN(params.page_size) ? params.page_size : DEFAULT_PAGE_SIZE;
        const skip =
            params.page && !isNaN(params.page) && !isNaN(limit)
                ? params.page * limit
                : undefined;

        let documentsCounter = -1;

        delete copyParams.page;
        delete copyParams.page_size;

        let find = {};

        const order = copyParams.order === 'true' ? 1 : -1;

        delete copyParams.order;

        if (copyParams.search) {
            const orFilters = new Filters(
                TO_SEARCH_PARAMS_DICT.search.map((field) =>
                    Filter.fromValues({
                        field,
                        operator: FilterOperator.Contains,
                        value: copyParams.search!
                    })
                ),
                FilterType.OR
            );

            const orConversions = super.convertCriteria(
                new Criteria(orFilters, Orders.none(), null)
            );

            find = { ...find, ...orConversions.find };

            delete copyParams.search;
        }

        if (copyParams.environment && typeof(copyParams.environment) === 'string') {
            find = {
                ...find,
                ...{
                    'environment.name': {
                        $in: copyParams.environment.split(';')
                    }
                }
            };

            delete copyParams.environment;
        }

        if (copyParams.customer && typeof(copyParams.customer) === 'string') {
            find = {
                ...find,
                ...{
                    'customer.name': {
                        $in: copyParams.customer.split(';')
                    }
                }
            };

            delete copyParams.customer;
        }

        const collection = (await this.collection());

        if(copyParams.count){
            documentsCounter = await collection.countDocuments(find);
        }
        
        const documents = collection.find(find, { limit, skip }).sort('createdAt', order);
        const items = (await documents.toArray()).map((document) => 
            this.getParsed(document)
        );

        return [new Documents(
                items.length <= 0 ? [] : items.map((i) => i.toPrimitives())), documentsCounter];
    }

    async searchByEnvironment(environment: string): Promise<Documents> {
        const find = {
                    'environment.id': {
                        $eq: environment
                    }
                };

        const collection = (await this.collection());
        
        const documents = collection.find(find);
        const items = (await documents.toArray()).map((document) => 
            this.getParsed(document)
        );

        return new Documents(items.length <= 0 ? [] : items.map((i) => i.toPrimitives()));
    }

    getParsed(document: any): Document{
        return Document.fromPrimitives({
            ...document,
            id: document._id
        });
    }

    async dropCollection() {
        (await this.collection()).drop();
    }
}