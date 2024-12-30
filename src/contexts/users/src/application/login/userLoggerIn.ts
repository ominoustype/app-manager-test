import FindRoleQuery from '@context/roles/application/find/findRoleQuery';
import FindRoleResponse from '@context/roles/application/find/findRoleResponse';
import { QueryBus } from '@context/shared/domain/queryBus/queryBus'
import UserByUsernameFinder from '@src/domain/userByUsernameFinder';
import UserRepository from '@src/domain/userRepository';
import LogInUserQuery from './loginUserQuery';
import LogInUserResponse from './loginUserResponse';
import Password from '@src/domain/password/password';
import Tokenator from '@src/infrastructure/persistence/mongo/tokenator';
import Token from '@src/domain/session/token';
import PasswordValidator from '@src/domain/password/passwordValidator';
import InvalidPasswordError from '@src/domain/errors/invalidPasswordError';
import logger from '@context/shared/infrastructure/logger';
import PasswordNotFound from '@src/domain/errors/passwordNotFoundError';

export default class UserLoggerIn {
    private readonly finder: UserByUsernameFinder;
    private readonly validator: PasswordValidator;
    private readonly generator: Tokenator;
    private readonly queryBus: QueryBus;

    constructor(repository: UserRepository, generator: Tokenator, validator: PasswordValidator, queryBus: QueryBus) {
        this.finder = new UserByUsernameFinder(repository);
        this.validator = validator;
        this.generator = generator;
        this.queryBus = queryBus;
    }

    async run(query: LogInUserQuery): Promise<LogInUserResponse> {
        const { username, password } = query;

        logger.info("Loggin user with ", { username });

        const user = await this.finder.find(username);

        if(!user.password) {
            throw new PasswordNotFound(username);
        }

        const isValid = this.validator.validate(
            new Password(password), 
            user.password
        );

        if(!isValid) {
            throw new InvalidPasswordError(username);
        }

        const role = (await this.queryBus.ask(
            new FindRoleQuery({ 
                id:user.role.id.value 
            }))
        ) as FindRoleResponse;

        const accessToken = this.generator.generateAccessToken(user.toPrimitives(), role.primitives);
        const refreshToken = this.generator.generateRefreshToken(user.toPrimitives());
        const token = new Token({ 
            token: accessToken, 
            refreshToken: refreshToken 
        });

        return new LogInUserResponse(token, user.username.toString());
    }
}
