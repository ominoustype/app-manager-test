/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb';
import EnvironmentArranger from '@src/infrastructure/arranger/environmentArranger';
import MongoDbInitializer from '@src/infrastructure/mongo/mongoDbInitializer';
import { resolve } from 'path';
import { promisify } from 'util';
import { readFile } from 'fs';

const readFileAsync = promisify(readFile);
export default class MongoEnvironmentArranger extends EnvironmentArranger {
    private _client: Promise<MongoClient>;

    private initializer: MongoDbInitializer;

    constructor(_client: Promise<MongoClient>) {
        super();

        this._client = _client;
        this.initializer = new MongoDbInitializer(this._client);
    }

    async arrange(): Promise<void> {
        await this.cleanDatabase();
        await this.createIndexes();
    }

    protected async cleanDatabase(): Promise<void> {
        const collections = await this.collections();

        for (const collection of collections) {
            // eslint-disable-next-line no-await-in-loop
            await (await this.client()).db().dropCollection(collection);
        }
    }

    private async collections(): Promise<string[]> {
        const client = await this.client(),
            collections = await client.db().listCollections(undefined, { nameOnly: true }).toArray();

        return collections.map((collection) => collection.name);
    }

    protected async createIndexes(): Promise<void> {
        await this.initializer.createIndexes([
            {
                collection: 'Platforms',
                indexes: await MongoEnvironmentArranger.readMappingsFile(
                    '../../../../backoffice/platforms/infrastructure/persistence/mongo/indexes/platforms.json'
                )
            },
            {
                collection: 'BackofficeContents',
                indexes: await MongoEnvironmentArranger.readMappingsFile(
                    '../../../../backoffice/contents/infrastructure/persistence/mongo/indexes/backofficecontents.json'
                )
            }
        ]);
    }

    private static async readMappingsFile(filepath: string): Promise<any> {
        const data = await readFileAsync(resolve(__dirname, filepath), 'utf8');

        return JSON.parse(data);
    }

    protected client(): Promise<MongoClient> {
        return this._client;
    }

    async close(): Promise<void> {
        return (await this.client()).close();
    }
}
