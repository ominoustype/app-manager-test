import SearchDeploymentsConfigsQuery, { SearchDeploymentsConfigsQueryParams } from "./searchDeploymentsConfigsQuery";

export default class SearchDeploymentsConfigsQueryMother {
    static create(params: SearchDeploymentsConfigsQueryParams): SearchDeploymentsConfigsQuery{
        return new SearchDeploymentsConfigsQuery(params);
    }

    static random(): SearchDeploymentsConfigsQuery{
        return SearchDeploymentsConfigsQueryMother.create({});
    }
}