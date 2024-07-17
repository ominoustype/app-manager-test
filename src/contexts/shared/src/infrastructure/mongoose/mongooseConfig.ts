type MongooseConfig = {
    connectionUri: string;
    models?: Array<string>;
    collection: string;
    options?: {
        dbName?: string;
        user?: string;
        pass?: string;
        maxPoolSize?: number;
        minPoolSize?: number;
        retryReads?: boolean;
        retryWrites?: boolean;
    };
};

export default MongooseConfig;
