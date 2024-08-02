import Query from '@context/shared/domain/queryBus/query'

export type FindDeploymentConfigsQueryParams = {
    id: string;
};

export default class FindDeploymentConfigsQuery extends Query {
    readonly id: string;

    constructor(params: FindDeploymentConfigsQueryParams){
        super();
        this.id = params.id;
    }
}