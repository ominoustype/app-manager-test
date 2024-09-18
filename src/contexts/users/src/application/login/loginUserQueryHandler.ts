import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import LogInUserQuery from './loginUserQuery';
import LogInUserResponse from './loginUserResponse';
import UserLoggerIn from './userLoggerIn';

export default class LogInUserQueryHandler implements QueryHandler<LogInUserQuery, LogInUserResponse> {
    private readonly loggerIn: UserLoggerIn;

    constructor(loggerIn: UserLoggerIn) {
        this.loggerIn = loggerIn;
    }

    subscribedTo(): Query {
        return LogInUserQuery;
    }

    handle(query: LogInUserQuery): Promise<LogInUserResponse> {
        return this.loggerIn.run(query);
    }
}
