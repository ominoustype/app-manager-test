import { Nullable } from '@src/domain/nullable';
import MongooseConfig from '@src/infrastructure/mongoose/mongooseConfig';
import { Connection, createConnection } from 'mongoose';
import fglob from 'fast-glob';
import { basename, extname } from 'path';

export default class MongooseClientFactory {
    private static clients: { [key: string]: Connection } = {};

    static async createClient(contextName: string, config: MongooseConfig) {
        let client = MongooseClientFactory.getClient(contextName);

        if (!client) {
            client = await MongooseClientFactory.create(config);

            MongooseClientFactory.registerClient(client, contextName);
        }

        return client;
    }

    private static async create(config: MongooseConfig): Promise<Connection> {
        const client = createConnection(config.connectionUri, config.options);

        await MongooseClientFactory.loadModels(client, config);

        return client;
    }

    private static async loadModels(connection: Connection, config: MongooseConfig): Promise<void> {
        const modelFiles = await fglob(config.models || '**/mongoose/*.model.{ts,js}', { absolute: true });

        await Promise.all(
            modelFiles.map(async (filepath) => {
                const modelFile = basename(filepath, extname(filepath)).split('.')[0],
                    modelName = modelFile.charAt(0).toLocaleUpperCase() + modelFile.slice(1),
                    // eslint-disable-next-line no-await-in-loop
                    model = await import(filepath);

                connection.model(model.modelName ?? modelName, model, config.collection);
            })
        );
    }

    private static getClient(contextName: string): Nullable<Connection> {
        return MongooseClientFactory.clients[contextName];
    }

    private static registerClient(client: Connection, contextName: string) {
        MongooseClientFactory.clients[contextName] = client;
    }
}
