import RedisClientFactory, { RedisConfig } from "@context/shared/infrastructure/redis/redisClientFactory";
import { RedisClientType } from "redis";
import TokenGenerator from "@context/users/infrastructure/persistence/mongo/tokenator";
import TokenRepository from '@context/users/infrastructure/persistence/redis/tokenRedisRespository';

const dependencies = new Map();

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6378;
const redisConfig: RedisConfig = { 
    url: `redis://${redisHost}:${redisPort}`
};

const tokenClient = RedisClientFactory.createClient('tokens', redisConfig);
const tokenRepository = new TokenRepository(tokenClient as unknown as RedisClientType);

const tokenGenerator = new TokenGenerator();

dependencies.set('tokenGenerator', tokenGenerator);
dependencies.set('tokenRepository', tokenRepository);

export { dependencies };
