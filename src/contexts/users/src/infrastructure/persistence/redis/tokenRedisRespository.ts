import RedisRepository from "@context/shared/infrastructure/redis/redisRepository";
import TokenRepository from "@src/domain/session/tokenRepository";

export default class TokenRedisRepository extends RedisRepository implements TokenRepository {
    protected moduleName(): string {
        return 'tokens';
    }

    async create(token: string, ttl:number): Promise<void> {
        await this.persistWithExpiration(token, ttl);
    }

    async find(token: string): Promise<string | null> {
        return await this.byId(token);
    }
}