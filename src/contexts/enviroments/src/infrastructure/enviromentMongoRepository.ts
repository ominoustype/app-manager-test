import Cursor from "@context/shared/domain/criteria/cursor";
import { Nullable } from "@context/shared/domain/nullable";
import MongoRepository from "@context/shared/infrastructure/mongo/mongoRepository";
import EnviromentId from "@src/domain/enviromentId";
import EnviromentRepository from "@src/domain/enviromentRepository";
import Enviroment from "@src/domain/enviroment";
import { SearchEnviromentsQueryParams } from "@src/application/search/searchEnviromentsQuery";
import Enviroments from "@src/domain/enviroments";
import Filter from "@context/shared/domain/criteria/filter";
import Filters, { FilterType } from "@context/shared/domain/criteria/filters";
import Criteria from "@context/shared/domain/criteria/criteria";
import { FilterOperator } from "@context/shared/domain/criteria/filterOperator";
import Orders from "@context/shared/domain/criteria/orders";

const TO_SEARCH_PARAMS_DICT = Object.freeze({
    search: ['name']
});

const DEFAULT_PAGE_SIZE = 50;

export default class EnviromentMongoRepository extends MongoRepository<Enviroment>
implements EnviromentRepository{
    protected moduleName(): string {
        return 'enviroments';
    }

    protected getCursor(item: Enviroment, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            _id: item.id.toString(), 
            isBackward 
        });
    }

    async find(id: EnviromentId): Promise<Nullable<Enviroment>> {
        return this.byId(id.value, Enviroment.fromPrimitives);
    }

    async create(enviroment: Enviroment): Promise<void> {
        await this.persist(enviroment.id.value, enviroment);
    }

    async delete(enviroment: Enviroment): Promise<void> {
        await this.remove(enviroment.id.value);
    }

    async update(enviroment: Enviroment): Promise<void> {
        await this.persist(enviroment.id.value, enviroment);
    }

    async search(params: SearchEnviromentsQueryParams): Promise<Enviroments> {
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

        const enviroment = collection.find(find, { limit, skip });
        const items = (await enviroment.toArray()).map((enviroment) => 
            this.getParsed(enviroment)
        );

        return new Enviroments(
            items.length <= 0 ? [] : items.map((i) => i.toPrimitives())
        );
    }

    getParsed(enviroment: any): Enviroment{
        return Enviroment.fromPrimitives({
            ...enviroment,
            id: enviroment._id
        });
    }
}