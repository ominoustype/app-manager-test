import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import FindEnviromentQuery from "./findEnviromentQuery";
import Query from "@context/shared/domain/queryBus/query";
import FindEnviromentResponse from "./findEnviromentResponse";
import EnviromentFinder from "./enviromentFinder";

export default class FindEnviromentQueryHandler implements QueryHandler<FindEnviromentQuery, FindEnviromentResponse>{
    private readonly finder: EnviromentFinder;

    constructor(finder: EnviromentFinder){
        this.finder = finder;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return FindEnviromentQuery;
    }

    handle(query: FindEnviromentQuery): Promise<FindEnviromentResponse> {
        return this.finder.run(query);
    }
}