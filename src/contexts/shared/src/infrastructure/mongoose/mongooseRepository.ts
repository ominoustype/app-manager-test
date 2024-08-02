import { Connection } from "mongoose";

export default abstract class MongooseRepository {
    private readonly client: Connection

    constructor(client: Connection) {
        this.client = client;
    }

    protected abstract modelName(): string;

    protected async model(): Promise<any> {
        const model = this.client.models

        return Promise.resolve(model)
    }
}