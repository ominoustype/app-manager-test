import Cursor from "@context/shared/domain/criteria/cursor";
import { Nullable } from "@context/shared/domain/nullable";
import MongoRepository from "@context/shared/infrastructure/mongo/mongoRepository";
import EnvironmentId from "@src/domain/environmentId";
import EnvironmentRepository from "@src/domain/environmentRepository";
import Environment from "@src/domain/environment";
import { SearchEnvironmentsQueryParams } from "@src/application/search/searchEnvironmentsQuery";
import Environments from "@src/domain/environments";
import Filter from "@context/shared/domain/criteria/filter";
import Filters, { FilterType } from "@context/shared/domain/criteria/filters";
import Criteria from "@context/shared/domain/criteria/criteria";
import { FilterOperator } from "@context/shared/domain/criteria/filterOperator";
import Orders from "@context/shared/domain/criteria/orders";

const TO_SEARCH_PARAMS_DICT = Object.freeze({
    search: ['name']
});

const DEFAULT_PAGE_SIZE = 50;

export default class EnvironmentMongoRepository extends MongoRepository<Environment>
implements EnvironmentRepository{
    protected moduleName(): string {
        return 'environments';
    }

    protected getCursor(item: Environment, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            _id: item.id.toString(), 
            isBackward 
        });
    }

    async find(id: EnvironmentId): Promise<Nullable<Environment>> {
        return this.byId(id.value, Environment.fromPrimitives);
    }

    async create(Environment: Environment): Promise<void> {
        await this.persist(Environment.id.value, Environment);
    }

    async delete(Environment: Environment): Promise<void> {
        await this.remove(Environment.id.value);
    }

    async update(Environment: Environment): Promise<void> {
        await this.persist(Environment.id.value, Environment);
    }

    async search(params: SearchEnvironmentsQueryParams): Promise<Environments> {
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

        const environment = collection.find(find, { limit, skip });
        const items = (await environment.toArray()).map((environment) => 
            this.getParsed(environment)
        );

        return new Environments(
            items.length <= 0 ? [] : items.map((i) => i.toPrimitives())
        );
    }

    getParsed(environment: any): Environment{
        return Environment.fromPrimitives({
            ...environment,
            id: environment._id
        });
    }
}