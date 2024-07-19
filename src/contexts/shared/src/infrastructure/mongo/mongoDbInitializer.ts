import { MongoClient } from 'mongodb';

export type MongoIndexesMapping = {
    collection: string;
    indexes: Array<Record<string, unknown>>;
};

export default class MongoDbInitializer {
    private client: Promise<MongoClient>;

    constructor(client: Promise<MongoClient>) {
        this.client = client;
    }

    async createIndexes(mappings: MongoIndexesMapping[]): Promise<void> {
        await Promise.all(mappings.map((m) => this.createIndex(m)));
    }

    private async createIndex({
        collection,
        indexes
    }: MongoIndexesMapping): Promise<void> {
        await (await this.client).db().command({
            createIndexes: collection,
            indexes
        });
    }
}
