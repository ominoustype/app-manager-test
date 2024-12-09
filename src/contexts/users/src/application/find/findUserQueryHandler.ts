import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import FindUserQuery from '@src/application/find/findUserQuery';
import FindUserResponse from '@src/application/find/findUserResponse';
import UserFinder from '@src/application/find/userFinder';

export default class FindUserQueryHandler implements QueryHandler<FindUserQuery, FindUserResponse> {
    private readonly finder: UserFinder;

    constructor(finder: UserFinder) {
        this.finder = finder;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return FindUserQuery;
    }

    handle(query: FindUserQuery): Promise<FindUserResponse> {
        return this.finder.run(query);
    }
}
