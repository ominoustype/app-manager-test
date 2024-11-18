import LogoutUserCommand from "./logoutUserCommand";
import TokenGenerator from "@src/infrastructure/persistence/mongo/tokenator";
import RedisService from "@context/shared/infrastructure/redis/redis";

export default class UserLoggerOut {

    private readonly tokenGenerator: TokenGenerator;

    private readonly redisService: RedisService;

    constructor(tokenGenerator: TokenGenerator, redisService: RedisService) {
        this.tokenGenerator = tokenGenerator;
        this.redisService = redisService;
    }

    async run(command: LogoutUserCommand): Promise<void> {
        const { accessToken, refreshToken } = command.data;

        if (accessToken) {
            this.invalidateToken(accessToken);
        }

        if (refreshToken) {
            this.invalidateToken(refreshToken);
        }
    }

    async invalidateToken(token: string) {
        const { payload, isValid } = this.tokenGenerator.verify(token);
        if (isValid) {
            const ttl = this.tokenGenerator.timeToLife(payload!);
            await this.redisService.setEx(token, ttl);
        }
    }
}