import FindRoleQuery from '@context/roles/application/find/findRoleQuery';
import FindRoleResponse from '@context/roles/application/find/findRoleResponse';
import { QueryBus } from '@context/shared/domain/queryBus/queryBus'
import UserByUsernameFinder from '@src/domain/userByUsernameFinder';
import UserRepository from '@src/domain/userRepository';
import LogInUserQuery from './loginUserQuery';
import LogInUserResponse from './loginUserResponse';

import PasswordValidator from '@src/infrastructure/persistence/mongo/passwordValidator';
import Password from '@src/domain/password/password';
import Tokenator from '@src/infrastructure/persistence/mongo/tokenator';
import Token from '@src/domain/session/token';

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
        const user = await this.finder.find(query.username);

        if(!user.password)
            return Promise.reject("User not found");

        const isValid = this.validator.validate(
            new Password(query.password), 
            user.password
        );

        if(!isValid)
            return Promise.reject("Wrong password");

        const role = (await this.queryBus.ask(
            new FindRoleQuery({ 
                id:user.role.id.value 
            }))) as FindRoleResponse;

        if(!role)
            return Promise.reject("Role not found");

        const accessToken = this.generator.generateAccessToken(user.toPrimitives(), role.primitives);
        const refreshToken = this.generator.generateRefreshToken(user.toPrimitives());
        const token = new Token({ 
            token: accessToken, 
            refreshToken: refreshToken 
        });

        return new LogInUserResponse(token, user.username.toString());
    }
}
