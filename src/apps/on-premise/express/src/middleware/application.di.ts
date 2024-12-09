import RedisService from "@context/shared/infrastructure/redis/redis";
import TokenGenerator from "@context/users/infrastructure/persistence/mongo/tokenator";

const dependencies = new Map();

const tokenGenerator = new TokenGenerator();
const redisService = new RedisService();

dependencies.set('tokenGenerator', tokenGenerator);
dependencies.set('redisService', redisService);

export { dependencies };
