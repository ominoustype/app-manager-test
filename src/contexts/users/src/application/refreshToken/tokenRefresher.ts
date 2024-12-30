import UserRepository from "@src/domain/userRepository";
import RefreshTokenQuery from "./refreshTokenQuery";
import RefreshTokenResponse from "./refreshTokenResponse";
import Tokenator from "@src/domain/session/tokenator";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import FindRoleResponse from "@context/roles/application/find/findRoleResponse";
import TokenRepository from "@src/infrastructure/persistence/redis/tokenRedisRespository";
import UserByUsernameFinder from "@src/domain/userByUsernameFinder";
import UserMissingParameterError from "@src/domain/errors/userMissingParameterError";
import InvalidTokenError from "@src/domain/errors/invalidTokenError";
import logger from "@context/shared/infrastructure/logger";

export default class TokenRefresher {
    private readonly finder: UserByUsernameFinder;
    private readonly tokenator: Tokenator;
    private readonly tokenRepository: TokenRepository;
    private readonly queryBus: QueryBus;

    constructor(repository: UserRepository, tokenator: Tokenator, tokenRepository: TokenRepository, queryBus: QueryBus) {
        this.finder = new UserByUsernameFinder(repository);
        this.tokenator = tokenator;
        this.tokenRepository = tokenRepository;
        this.queryBus = queryBus;
    }

    async run(query: RefreshTokenQuery): Promise<RefreshTokenResponse> {
        const { refreshToken }  = query;

        logger.info("Refreshing token ", { refreshToken });

        if(!refreshToken) {
            throw new UserMissingParameterError();
        }

        const { payload, isValid } = this.tokenator.verify(refreshToken);

        if(!isValid) {
            throw new InvalidTokenError(refreshToken);
        }

        const ttl = this.tokenator.timeToLife(payload!);

        await this.tokenRepository.create(refreshToken, ttl); //TODO ?

        const user = await this.finder.find(payload!.username);

        const role = (await this.queryBus.ask(
            new FindRoleQuery({ 
                id: user.role.id.value 
            })
        )) as FindRoleResponse;

        const accessToken = this.tokenator.generateAccessToken(user.toPrimitives(), role.primitives);

        return new RefreshTokenResponse(accessToken);
    }
}