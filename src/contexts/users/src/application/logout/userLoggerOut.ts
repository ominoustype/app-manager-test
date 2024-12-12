import TokenRepository from "@src/infrastructure/persistence/redis/tokenRedisRespository";
import LogoutUserCommand from "./logoutUserCommand";
import TokenGenerator from "@src/infrastructure/persistence/mongo/tokenator";

export default class UserLoggerOut {

    private readonly tokenGenerator: TokenGenerator;

    private readonly tokenRepository: TokenRepository;

    constructor(tokenGenerator: TokenGenerator, tokenRepository: TokenRepository) {
        this.tokenGenerator = tokenGenerator;
        this.tokenRepository = tokenRepository;
    }

    async run(command: LogoutUserCommand): Promise<void> {
        const { accessToken, refreshToken } = command.data;

        if (accessToken) {
            await this.invalidateToken(accessToken);
        }

        if (refreshToken) {
            await this.invalidateToken(refreshToken);
        }
    }

    async invalidateToken(token: string) {
        const { payload, isValid } = this.tokenGenerator.verify(token);
        if (isValid) {
            const ttl = this.tokenGenerator.timeToLife(payload!);
            await this.tokenRepository.create(token, ttl);
        }
    }
}