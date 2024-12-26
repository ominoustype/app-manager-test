import RedisClientFactory from "@context/shared/infrastructure/redis/redisClientFactory";
import { RedisClientType } from "redis";
import TokenGenerator from "@context/users/infrastructure/persistence/mongo/tokenator";
import TokenRepository from '@context/users/infrastructure/persistence/redis/tokenRedisRespository';
import UserAuth from "@context/users/application/auth/userAuth";
import AuthUserQueryHandler from "@context/users/application/auth/authUserQueryHandler";
import AuthUserQuery from "@context/users/application/auth/authUserQuery";

const dependencies = new Map();

export const HANDLERS = "handlers";
export const REPOSITORIES = "repositories";

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6378;

const tokenClient = RedisClientFactory.createClient('tokens', {
    url: `redis://${redisHost}:${redisPort}`
});

const tokenRepository = new TokenRepository(tokenClient as unknown as RedisClientType);
const tokenGenerator = new TokenGenerator();

const queryHandlers = new Map<any, any>();

const userAuth = new UserAuth(tokenGenerator, tokenRepository);
const authUserCommandHandler = new AuthUserQueryHandler(userAuth);
queryHandlers.set(AuthUserQuery, authUserCommandHandler);

dependencies.set(HANDLERS, { query: queryHandlers } );
dependencies.set(REPOSITORIES, { repository: tokenRepository });

export { dependencies };
