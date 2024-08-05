import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import FindEnvironmentQuery from "./findEnvironmentQuery";
import Query from "@context/shared/domain/queryBus/query";
import FindEnvironmentResponse from "./findEnvironmentResponse";
import EnvironmentFinder from "./environmentFinder";

export default class FindEnvironmentQueryHandler implements QueryHandler<FindEnvironmentQuery, FindEnvironmentResponse>{
    private readonly finder: EnvironmentFinder;

    constructor(finder: EnvironmentFinder){
        this.finder = finder;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return FindEnvironmentQuery;
    }

    handle(query: FindEnvironmentQuery): Promise<FindEnvironmentResponse> {
        return this.finder.run(query);
    }
}