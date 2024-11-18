import { createClient } from "redis";

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || 6379

export default class RedisService {
    readonly client;

    constructor() {
        this.client = createClient({
            url: `redis://${redisHost}:${redisPort}`
          });
    }

    async setEx(key: any, time: number) {
        await this.client.connect();
        await this.client.setEx(key, time, "true");
        await this.client.disconnect();
    }

    async get(key: any) {
        await this.client.connect();
        const result = await this.client.get(key);
        await this.client.disconnect();
        return result;
    }
}