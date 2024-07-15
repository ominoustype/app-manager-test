/* eslint-disable no-underscore-dangle */
import AggregateRoot from '@src/domain/aggregateRoot';
import { Nullable } from '@src/domain/nullable';
import DdbOneTableConfig from '@src/infrastructure/persistence/ddbOneTable/ddbOneTableConfig';
import { Table, Model, OneModel } from 'dynamodb-onetable';

export default abstract class DdbOneTableRepository<T extends AggregateRoot> {
    protected readonly table: Promise<Table>;

    private readonly indexes: { [key: string]: string; };

    constructor(table: Promise<Table>, config: DdbOneTableConfig) {
        this.table = table;
        this.indexes = DdbOneTableRepository.buildIndexesMap(config);
    }

    private static buildIndexesMap(config: DdbOneTableConfig): { [key: string]: string; } {
        const map: { [key: string]: string; } = {};

        Object.entries(config.indexes).forEach(([indexName, { hash }]) => {
            if (hash) {
                map[hash] = indexName;
            }
        });

        return map;
    }

    protected abstract modelName(): string;

    protected abstract loadModel(): OneModel;

    protected async getModel(): Promise<Model<any>> {
        const table = await this.table,
            modelName = this.modelName();

        await this.loadSchema();

        return table.getModel(modelName);
    }

    private async loadSchema(): Promise<void> {
        const table = await this.table,
            modelName = this.modelName();

        try {
            table.getModel(modelName);
        } catch {
            table.addModel(modelName, this.loadModel());
        }
    }

    protected async persist(aggregateRoot: T, opts?: { exists?: any, _ttl?: number }): Promise<void> {
        const model = await this.getModel(),
            _ttl = opts?._ttl ?? undefined,
            primitives = aggregateRoot.toPrimitives() as any;

        if (_ttl) {
            primitives._ttl = _ttl;
        }

        await model.create(primitives, opts);
    }

    protected getIndexForHash(hashName: string): string {
        return this.indexes[hashName];
    }

    protected async getItem(
        primaryKey: Record<string, string>,
        options: { index?: string },
        Ctor: new (primitives: any) => T
    ): Promise<Nullable<T>> {
        const primitives = await (await this.getModel()).get(primaryKey, options);

        return primitives ? new Ctor(primitives) : null;
    }

    protected async deleteItem(keys: Record<string, string>): Promise<void> {
        await (await this.getModel()).remove(keys);
    }
}
