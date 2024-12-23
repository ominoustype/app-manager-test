import Criteria from "@context/shared/domain/criteria/criteria";
import Cursor from "@context/shared/domain/criteria/cursor"
import Filter from "@context/shared/domain/criteria/filter";
import { FilterOperator } from "@context/shared/domain/criteria/filterOperator";
import Filters, { FilterType } from "@context/shared/domain/criteria/filters";
import Orders from "@context/shared/domain/criteria/orders";
import { Nullable } from "@context/shared/domain/nullable";
import MongoRepository from "@context/shared/infrastructure/mongo/mongoRepository"
import { SearchDeploymentsConfigsQueryParams } from "@src/application/search/searchDeploymentsConfigsQuery";
import { SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams } from "@src/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery";
import DeploymentConfigs from "@src/domain/deploymentConfigs"
import DeploymentConfigsId from "@src/domain/deploymentConfigsId";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import DeploymentsConfigs from "@src/domain/deploymentsConfigs"

const TO_SEARCH_PARAMS_DICT = Object.freeze({
    search: ['name']
});

const DEFAULT_PAGE_SIZE = 50;

export default class DeploymentConfigsMongoRepository extends 
                MongoRepository<DeploymentConfigs> implements DeploymentConfigsRepository{

    protected moduleName(): string {
        return('deploymentConfigs');
    }

    protected getCursor(item: DeploymentConfigs, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            _id: item.id.toString(), 
            isBackward 
        });
    }

    async find(id: DeploymentConfigsId): Promise<Nullable<DeploymentConfigs>> {
        return this.byId(id.value, DeploymentConfigs.fromPrimitives);
    }

    async findByIdAndEnvironmentIds(id: DeploymentConfigsId, environmentIds: Array<string> = []):  
        Promise<Nullable<DeploymentConfigs>> {

        const find = {
            _id: id.value as any,
            'environment.id': { 
                $in: environmentIds 
            }
        };

        const collection = (await this.collection());

        const document = await collection.findOne(find);

        if (!document) {
            return null;
        }

        return this.getParsed(document);
    }

    async create(deploymentConfigs: DeploymentConfigs): Promise<void> {
        await this.persist(deploymentConfigs.id.value, deploymentConfigs)
    }

    async delete(deploymentConfigs: DeploymentConfigs): Promise<void> {
        await this.remove(deploymentConfigs.id.value);
    }

    async update(deploymentConfigs: DeploymentConfigs): Promise<void> {
        await this.persist(deploymentConfigs.id.value, deploymentConfigs);
    }

    async deploy(deploymentConfigs: DeploymentConfigs): Promise<void> {
        await this.persist(deploymentConfigs.id.value, deploymentConfigs)
    }

    async search(params: SearchDeploymentsConfigsQueryParams = {},  environmentIds: Array<string> = []): Promise<DeploymentsConfigs> {
        const copyParams = { ...params };
        const limit = params.page_size ?? DEFAULT_PAGE_SIZE;
        const skip =
            params.page && limit
                ? params.page * limit
                : undefined;

        delete copyParams.page;
        delete copyParams.page_size;

        let find = {           
            'environment.id': { 
            $in: environmentIds
        }};

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

        const deploymentConfigs = collection.find(find, { limit, skip });
        const items = (await deploymentConfigs.toArray()).map((deploymentConfigs) => 
            this.getParsed(deploymentConfigs)
        );

        return new DeploymentsConfigs(
            items.length <= 0 ? [] : items.map((i) => i.toPrimitives())
        );
    }
    
    async searchByEnvironmentIsDeployed(params: SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams): Promise<DeploymentsConfigs> {
        const { environmentId, isDeployed } = params;

        const find = {
            'environment.id': {
                $eq: environmentId
            },
            'isDeployed': {
                $eq: isDeployed
            }
        };

        const collection = (await this.collection());

        const documents = collection.find(find);
        const items = (await documents.toArray()).map((deploymentConfigs) => 
            this.getParsed(deploymentConfigs)
        );
        
        return new DeploymentsConfigs(items.length <= 0 ? [] : items.map((i) => i.toPrimitives()));
    }

    getParsed(deploymentConfigs: any): DeploymentConfigs{
        return DeploymentConfigs.fromPrimitives({
            
            ...deploymentConfigs,
            id: deploymentConfigs._id
        });
    }

    async dropCollection() {
        (await this.collection()).drop();
    }
}