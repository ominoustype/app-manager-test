import InMemorySyncEventBus from "@context/shared/infrastructure/eventBus/inMemorySyncEventBus";
import EnvironmentMongoRepository from '@context/environments/infrastructure/environmentMongoRepository';
import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import { MongoClient } from 'mongodb'
import CreateEnvironmentCommandHandler from "@context/environments/application/create/createEnvironmentCommandHandler";
import EnvironmentCreator from "@context/environments/application/create/environmentCreator";
import EnvironmentUpdater from "@context/environments/application/update/environmentUpdater";
import EnvironmentRemover from "@context/environments/application/delete/environmentRemover";
import EnvironmentFinder from "@context/environments/application/find/environmentFinder";
import EnvironmentsSearcher from "@context/environments/application/search/environmentsSearcher";
import UpdateEnvironmentCommandHandler from "@context/environments/application/update/updateEnvironmentCommandHandler";
import RemoveEnvironmentCommandHandler from "@context/environments/application/delete/removeEnvironmentCommandHandler";
import FindEnvironmentQueryHandler from '@context/environments/application/find/findEnvironmentQueryHandler';
import Command from '@context/shared/domain/commandBus/command';
import SearchEnvironmentsQueryHandler from "@context/environments/application/search/searchEnvironmentsQueryHandler";
import CreateEnvironmentCommand from "@context/environments/application/create/createEnvironmentCommand";
import UpdateEnvironmentCommand from "@context/environments/application/update/updateEnvironmentCommand";
import RemoveEnvironmentCommand from "@context/environments/application/delete/removeEnvironmentCommand";
import FindEnvironmentQuery from "@context/environments/application/find/findEnvironmentQuery";
import SearchEnvironmentsQuery from "@context/environments/application/search/searchEnvironmentsQuery";
import InMemoryQueryBus from "@context/shared/infrastructure/queryBus/inMemoryQueryBus";
import QueryHandlersInformation from "@context/shared/infrastructure/queryBus/queryHandlersInformation";
import InMemoryCommandBus from "@context/shared/infrastructure/commandBus/inMemoryCommandBus";
import CommandHandlersInformation from "@context/shared/infrastructure/commandBus/commandHandlersInformation";
import DocumentsByEnvironmentSearcher from "@context/documents/application/searchByEnvironment/documentsByEnvironmentSearcher";
import DocumentMongoRepository from '@context/documents/infrastructure/persistence/mongo/documentMongoRepository';
import SearchByEnvironmentDocumentsQueryHandler from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQueryHandler";
import SearchByEnvironmentDocumentsQuery from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQuery";
import DocumentUpdater from "@context/documents/application/update/documentUpdater";
import UpdateDocumentCommandHandler from "@context/documents/application/update/updateDocumentCommandHandler";
import UpdateDocumentCommand from "@context/documents/application/update/updateDocumentCommand";
import DeployEnvironmentCommand from "@context/environments/application/deploy/deployEnvironmentCommand";
import EnvironmentDeployer from "@context/environments/application/deploy/environmentDeployer";
import DeployEnvironmentCommandHandler from "@context/environments/application/deploy/deployEnvironmentCommandHandler";
import RoleMongoRepository from "@context/roles/infrastructure/persistence/mongo/roleMongoRepository";
import RoleUpdater from "@context/roles/application/update/roleUpdater";
import UpdateRoleCommandHandler from "@context/roles/application/update/updateRoleCommandHandler";
import UpdateRoleCommand from "@context/roles/application/update/updateRoleCommand";
import UserFinder from "@context/users/application/find/userFinder";
import FindUserQueryHandler from "@context/users/application/find/findUserQueryHandler";
import FindUserQuery from "@context/users/application/find/findUserQuery";
import UserMongoRepository from "@context/users/infrastructure/persistence/mongo/userMongoRepository";
import RoleFinder from "@context/roles/application/find/roleFinder";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import FindRoleQueryHandler from "@context/roles/application/find/findRoleQueryHandler";
import RoleByCustomerAndNameFinder from "@context/roles/application/findByCustomerAndName/roleByCustomerAndNameFinder";
import FindByCustomerAndNameRoleQuery from "@context/roles/application/findByCustomerAndName/findByCustomerAndNameRoleQuery";
import FindByCustomerAndNameRoleQueryHandler from "@context/roles/application/findByCustomerAndName/findByCustomerAndNameRoleQueryHandler";
import UserLoggerOut from "@context/users/application/logout/userLoggerOut";
import LogOutUserCommandHandler from "@context/users/application/logout/logoutUserCommandHandler";
import RedisClientFactory from '@context/shared/infrastructure/redis/redisClientFactory';
import TokenRepository from '@context/users/infrastructure/persistence/redis/tokenRedisRespository';
import { RedisClientType } from "redis";
import Tokenator from "@context/users/infrastructure/persistence/mongo/tokenator";
import LogoutUserCommand from "@context/users/application/logout/logoutUserCommand";

const dependencies = new Map();

export const HANDLERS = "handlers";
export const REPOSITORIES = "repositories";
export const BUSES = "buses"

const mongodbHost = process.env.MONGODB_HOST || 'localhost';
const mongodbPort = process.env.MONGODB_PORT || 27028;

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6378;

const client = MongoClientFactory.createClient('environments', {
    url: `mongodb://${mongodbHost}:${mongodbPort}`
});

const documentClient = MongoClientFactory.createClient('documents', {
    url: `mongodb://${mongodbHost}:${mongodbPort}`
});

const roleClient = MongoClientFactory.createClient('roles', {
    url: `mongodb://${mongodbHost}:${mongodbPort}`
});

const userClient = MongoClientFactory.createClient('users', {
    url: `mongodb://${mongodbHost}:${mongodbPort}`
});

const tokenClient = RedisClientFactory.createClient('tokens', {
    url: `redis://${redisHost}:${redisPort}`
});

const environmentRepository = new EnvironmentMongoRepository(client as unknown as MongoClient);
const documentRepository = new DocumentMongoRepository(documentClient as unknown as MongoClient);
const roleRepository = new RoleMongoRepository(roleClient as unknown as MongoClient);
const userRepository = new UserMongoRepository(userClient as unknown as MongoClient);
const tokenRepository = new TokenRepository(tokenClient as unknown as RedisClientType);

const eventBus = new InMemorySyncEventBus();
const queryBus = new InMemoryQueryBus(new QueryHandlersInformation([]));
const commandBus = new InMemoryCommandBus(new CommandHandlersInformation([]));

const tokenator = new Tokenator();

const environmentCreator = new EnvironmentCreator(environmentRepository, eventBus, queryBus, commandBus);
const environmentUpdater = new EnvironmentUpdater(environmentRepository, eventBus, queryBus, commandBus);
const environmentRemover = new EnvironmentRemover(environmentRepository, eventBus);
const environmentDeployer = new EnvironmentDeployer(environmentRepository, eventBus);

const environmentFinder = new EnvironmentFinder(environmentRepository);
const environmentSearcher = new EnvironmentsSearcher(environmentRepository);

const createEnvironmentCommandHandler = new CreateEnvironmentCommandHandler(environmentCreator);
const updateEnvironmentCommandHandler = new UpdateEnvironmentCommandHandler(environmentUpdater);
const removeEnvironmentCommandHandler = new RemoveEnvironmentCommandHandler(environmentRemover);
const deployEnvironmentCommandHandler = new DeployEnvironmentCommandHandler(environmentDeployer);

const findEnvironmentQueryHandler =  new FindEnvironmentQueryHandler(environmentFinder);
const searchEnvironmentsQueryHandler = new SearchEnvironmentsQueryHandler(environmentSearcher);

const commandHandlers = new Map<Command,any>();
const queryHandlers = new Map<any, any>();

// External dependencies
const documentsByEnvironmentSearcher = new DocumentsByEnvironmentSearcher(documentRepository);
const searchByEnvironmentDocumentsQueryHandler = new SearchByEnvironmentDocumentsQueryHandler(documentsByEnvironmentSearcher);
queryHandlers.set(SearchByEnvironmentDocumentsQuery, searchByEnvironmentDocumentsQueryHandler);

const documentUpdater = new DocumentUpdater(documentRepository, eventBus);
const updateDocumentCommandHandler = new UpdateDocumentCommandHandler(documentUpdater);
commandHandlers.set(UpdateDocumentCommand, updateDocumentCommandHandler);

    //Find User, find Role, findByCustomerAndName Role, update Role
const userFinder = new UserFinder(userRepository);
const findUserQueryHandler = new FindUserQueryHandler(userFinder);
queryHandlers.set(FindUserQuery, findUserQueryHandler);

const userLogout = new UserLoggerOut(tokenator, tokenRepository);
const logoutUserCommandHandler = new LogOutUserCommandHandler(userLogout);
commandHandlers.set(LogoutUserCommand, logoutUserCommandHandler);

const roleFinder = new RoleFinder(roleRepository);
const findRoleQueryHandler = new FindRoleQueryHandler(roleFinder);
queryHandlers.set(FindRoleQuery, findRoleQueryHandler);

const roleByCustomerAndNameFinder = new RoleByCustomerAndNameFinder(roleRepository);
const findByCustomerAndNameRoleQueryHandler = new FindByCustomerAndNameRoleQueryHandler(roleByCustomerAndNameFinder);
queryHandlers.set(FindByCustomerAndNameRoleQuery, findByCustomerAndNameRoleQueryHandler);

const roleUpdater = new RoleUpdater(roleRepository, eventBus);
const updateRoleCommandHandler = new UpdateRoleCommandHandler(roleUpdater);
commandHandlers.set(UpdateRoleCommand, updateRoleCommandHandler);
// end region

commandHandlers.set(CreateEnvironmentCommand, createEnvironmentCommandHandler);
commandHandlers.set(UpdateEnvironmentCommand, updateEnvironmentCommandHandler);
commandHandlers.set(RemoveEnvironmentCommand, removeEnvironmentCommandHandler);
commandHandlers.set(DeployEnvironmentCommand, deployEnvironmentCommandHandler);

queryHandlers.set(FindEnvironmentQuery, findEnvironmentQueryHandler);
queryHandlers.set(SearchEnvironmentsQuery, searchEnvironmentsQueryHandler);

dependencies.set(HANDLERS, { query: queryHandlers, command: commandHandlers });
dependencies.set(REPOSITORIES, { repository: environmentRepository });
dependencies.set(BUSES, { query: queryBus, command: commandBus });

export { dependencies };
