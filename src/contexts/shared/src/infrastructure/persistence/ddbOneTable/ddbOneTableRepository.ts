import AggregateRoot from '@src/domain/aggregateRoot';
import { Nullable } from '@src/domain/nullable';
import { Table, Model, OneModel } from 'dynamodb-onetable';

export default abstract class DdbOneTableRepository<T extends AggregateRoot> {
    private readonly table: Promise<Table>;

    constructor(table: Promise<Table>) {
        this.table = table;
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
            // eslint-disable-next-line no-underscore-dangle
            _ttl = opts?._ttl ?? undefined,
            primitives = aggregateRoot.toPrimitives() as any;

        if (_ttl) {
            // eslint-disable-next-line no-underscore-dangle
            primitives._ttl = _ttl;
        }

        await model.create(primitives, opts);
    }

    protected async getItem(
        primaryKey: Record<string, string>,
        options: { index?: string },
        Ctor: new (primitives: any) => T
    ): Promise<Nullable<T>> {
        const primitives = await (await this.getModel()).get(primaryKey, options);

        return primitives ? new Ctor(primitives) : null;
    }
}
