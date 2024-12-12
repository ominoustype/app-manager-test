import { Nullable } from "@src/domain/nullable";
import { createClient, RedisClientType } from "redis";

export type RedisConfig = { url: string };

export default class RedisClientFactory {
    private static clients: { [key: string]: RedisClientType } = {};

    static async createClient(contextName: string, config: RedisConfig): Promise<RedisClientType> {
        let client = RedisClientFactory.getClient(contextName);

        if (!client) {
            client = await RedisClientFactory.createAndConnectClient(config);

            RedisClientFactory.registerClient(client, contextName);
        }

        return client;
    }

    private static getClient(contextName: string): Nullable<RedisClientType> {
        return RedisClientFactory.clients[contextName];
    }

    private static async createAndConnectClient(config: RedisConfig): Promise<RedisClientType> {
        const client = createClient({
            url: config.url
        });

        await client.connect();

        return client as RedisClientType;
    }

    private static registerClient(client: RedisClientType, contextName: string): void {
        RedisClientFactory.clients[contextName] = client;
    }
}