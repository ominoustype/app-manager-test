import Query from '@src/domain/queryBus/query';
import { Response } from '@src/domain/queryBus/response';
import { QueryBus } from '@src/domain/queryBus/queryBus';
import QueryHandlersInformation from '@src/infrastructure/queryBus/queryHandlersInformation';
import { QueryHandler } from '@src/domain/queryBus/queryHandler';

export default class InMemoryQueryBus implements QueryBus {
    private queryHandlersInformation: QueryHandlersInformation;

    constructor(queryHandlersInformation: QueryHandlersInformation) {
        this.queryHandlersInformation = queryHandlersInformation;
    }

    async ask<R extends Response>(query: Query): Promise<R> {
        const handler = this.queryHandlersInformation.search(query);

        return handler.handle(query) as Promise<R>;
    }

    addQueryHandlers(queryHandlers: Array<QueryHandler<Query, Response>>) {
        this.queryHandlersInformation.addQueryHandlers(queryHandlers);
    }
}
