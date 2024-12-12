import { RedisClientType } from "redis";

export default abstract class RedisRepository {
    private _client: RedisClientType;

    constructor(_client: RedisClientType) {
        this._client = _client;
    }

    protected abstract moduleName(): string;

    protected client(): RedisClientType {
        return this._client;
    }

    protected async byId(id: string): Promise<string | null> {
        const token = (await this._client).get(id);

        return token;
    }

    protected async persistWithExpiration(id: string, ttl: number): Promise<void> {
        (await this._client).setEx(id, ttl, "true");
    }
}
