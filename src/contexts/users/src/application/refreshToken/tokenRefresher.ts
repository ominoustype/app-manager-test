import UserRepository from "@src/domain/userRepository";
import Username from "@src/domain/username";
import RefreshTokenQuery from "./refreshTokenQuery";
import RefreshTokenResponse from "./refreshTokenResponse";
import Tokenator from "@src/domain/session/tokenator";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import FindRoleResponse from "@context/roles/application/find/findRoleResponse";
import TokenRepository from "@src/infrastructure/persistence/redis/tokenRedisRespository";

export default class TokenRefresher {
    private readonly repository: UserRepository;
    private readonly tokenator: Tokenator;
    private readonly tokenRepository: TokenRepository;
    private readonly queryBus: QueryBus;

    constructor(repository: UserRepository, tokenator: Tokenator, tokenRepository: TokenRepository, queryBus: QueryBus) {
        this.repository = repository;
        this.tokenator = tokenator;
        this.tokenRepository = tokenRepository;
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

        await this.tokenRepository.create(refreshToken, ttl);

        const user = await this.repository.findByUsername(
            new Username(payload!.username)
        );

        if(!user)
            throw new Error("User not found");

        const role = (await this.queryBus.ask(
            new FindRoleQuery({ 
                id: user.role.id.value 
            }))) as FindRoleResponse;

        if(!role)
            throw new Error("Role not found");

        const accessToken = this.tokenator.generateAccessToken(user.toPrimitives(), role.primitives);

        console.log("nuevo access "+accessToken);

        return new RefreshTokenResponse(accessToken);
    }
}