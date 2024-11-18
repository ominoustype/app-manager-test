import UserRepository from "@src/domain/userRepository";
import Username from "@src/domain/username";
import RefreshTokenQuery from "./refreshTokenQuery";
import RefreshTokenResponse from "./refreshTokenResponse";
import Tokenator from "@src/domain/session/tokenator";
import RedisService from "@context/shared/infrastructure/redis/redis";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import FindRoleResponse from "@context/roles/application/find/findRoleResponse";

export default class TokenRefresher {
    private readonly repository: UserRepository;
    private readonly tokenator: Tokenator;
    private readonly redisService: RedisService;
    private readonly queryBus: QueryBus;

    constructor(repository: UserRepository, tokenator: Tokenator, redisService: RedisService, queryBus: QueryBus) {
        this.repository = repository;
        this.tokenator = tokenator;
        this.redisService = redisService;
        this.queryBus = queryBus;
    }

    async run(query: RefreshTokenQuery): Promise<RefreshTokenResponse> {
        const refreshToken  = query.refreshToken;

        if(!refreshToken)
            throw new Error("Refresh token not found");

        const { payload, isValid } = this.tokenator.verify(refreshToken);

        if(!isValid)
            throw new Error("Invalid refresh token");

        const ttl = this.tokenator.timeToLife(payload!);

        this.redisService.setEx(refreshToken, ttl);

        const user = await this.repository.findByUsername(
            new Username(payload!.username)
        );

        if(!user)
            throw new Error("User not found");

        const role = (await this.queryBus.ask(
            new FindRoleQuery({ 
                id:user.role.id.value 
            }))) as FindRoleResponse;

        if(!role)
            return Promise.reject("Role not found");

        const accessToken = this.tokenator.generateAccessToken(user.toPrimitives(), role.primitives);

        return new RefreshTokenResponse(accessToken);
    }
}