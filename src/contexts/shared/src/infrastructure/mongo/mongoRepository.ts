/* eslint-disable no-underscore-dangle */
import { Collection, MongoClient, ObjectId } from 'mongodb';
import AggregateRoot from '@src/domain/aggregateRoot';
import { Nullable } from '@src/domain/nullable';
import MongoCriteriaConverter from '@src/infrastructure/mongo/mongoCriteriaConverter';
import Criteria from '@src/domain/criteria/criteria';
import Cursor from '@src/domain/criteria/cursor';
import Filters from '@src/domain/criteria/filters';
import Orders from '@src/domain/criteria/orders';
import Cursors from '@src/domain/criteria/cursors';
import { FilterOperator } from '@src/domain/criteria/filterOperator';
import Filter from '@src/domain/criteria/filter';

export default abstract class MongoRepository<T extends AggregateRoot> {
    private _client: MongoClient;

    private converter: MongoCriteriaConverter;

    constructor(_client: MongoClient) {
        this._client = _client;
        this.converter = new MongoCriteriaConverter();
    }

    protected abstract moduleName(): string;

    protected client(): MongoClient {
        return this._client;
    }

    protected async collection(): Promise<Collection> {
        return (await this._client).db().collection(this.moduleName());
    }

    protected persist(id: string, aggregateRoot: T): Promise<void> {
        return this.rawPersist(id, aggregateRoot.toPrimitives() as Record<string, any>);
    }

    protected async rawPersist(id: string, item: Record<string, any>): Promise<void> {
        const collection = await this.collection(),
            document = {
                ...item,
                _id: id,
                id: undefined
            };

        await collection.updateOne({ _id: id as unknown as ObjectId }, { $set: document }, { upsert: true });
    }

    protected async remove(id: string): Promise<void> {
        const collection = await this.collection();

        await collection.deleteOne({ _id: id as unknown as ObjectId });
    }

    protected async byId(id: string, fromPrimitives: (plainData: any) => T): Promise<Nullable<T>> {
        const collection = await this.collection(),
            documents = await collection.find({ _id: id as unknown as ObjectId }).toArray();

        if (documents.length === 0) {
            return null;
        }

        return fromPrimitives({
            ...documents[0],
            // eslint-disable-next-line no-underscore-dangle
            id: documents[0]._id
        });
    }

    protected async byField(field: keyof T, value: string, fromPrimitives: (plainData: any) => T): Promise<T[]> {
        const filter = Filter.fromValues({
                field: field as string,
                operator: FilterOperator.Equal,
                value
            }),
            criteria = new Criteria(new Filters([filter]), Orders.none(), null),
            data = await this.byCriteria(criteria, fromPrimitives);

        return data;
    }

    protected async all(fromPrimitives: (plainData: any) => T, cursor?: Cursor): Promise<T[]> {
        const criteria = new Criteria(Filters.none(), Orders.none(), cursor || null);

        return this.byCriteria(criteria, fromPrimitives);
    }

    protected async byCriteria(criteria: Criteria, fromPrimitives: (plainData: any) => T): Promise<T[]> {
        const collection = await this.collection(),
            { find, sort } = this.converter.convert(MongoRepository.addDefaultOrder(criteria)),
            documents = sort ? collection.find(find).sort(sort) : collection.find(find),
            // eslint-disable-next-line no-underscore-dangle
            items = (await documents.toArray()).map((document) => fromPrimitives({
                ...document,
                // eslint-disable-next-line no-underscore-dangle
                id: document._id
            }));

        return items;
    }

    private static addDefaultOrder(criteria: Criteria): Criteria {
        if (!criteria.hasOrder()) {
            return new Criteria(
                criteria.filters,
                Orders.fromValues([
                    {
                        orderBy: '_id',
                        orderType: 'asc'
                    }
                ]),
                criteria.cursor
            );
        }

        return criteria;
    }

    protected getCursors(items: T[]): Cursors {
        return Cursors.createFromList(items, this.getCursor.bind(this));
    }

    protected abstract getCursor(item: T, isBackward: boolean): Cursor;

    convertCriteria(criteria: Criteria) {
        return this.converter.convert(
            MongoRepository.addDefaultOrder(criteria)
        );
    }
}
