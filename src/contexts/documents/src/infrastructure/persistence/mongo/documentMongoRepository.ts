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
import Documents from '@src/domain/documents';

const TO_SEARCH_PARAMS_DICT = Object.freeze({
    search: ['name']
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

    async find(id: DocumentId): Promise<Nullable<Document>> {
        return this.byId(id.value, Document.fromPrimitives);
    }

    async search(params: SearchDocumentsQueryParams = {}): Promise<Documents> {
        const copyParams = { ...params };
        const limit = params.page_size ?? DEFAULT_PAGE_SIZE;
        const skip =
            params.page && limit
                ? params.page * limit
                : undefined;

        delete copyParams.page;
        delete copyParams.page_size;

        let find = {};

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

        const collection = await this.collection();

        const documents = collection.find(find, { limit, skip });
        const items = (await documents.toArray()).map((document) =>
            Document.fromPrimitives({
                ...document,
                // eslint-disable-next-line no-underscore-dangle
                id: document._id
            })
        );

        return new Documents(
            items.length <= 0 ? [] : items.map((i) => i.toPrimitives())
        );
    }

    
}