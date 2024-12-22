import CreateUserCommand from '@context/users/application/create/createUserCommand';
import CreateUserCommandHandler from '@context/users/application/create/createUserCommandHandler';
import UserFinder from '@context/users/application/find/userFinder';
import UsersSearcher from '@context/users/application/search/usersSearcher';
import FindUserQueryHandler from '@context/users/application/find/findUserQueryHandler';
import FindUserQuery from '@context/users/application/find/findUserQuery';
import SearchUsersQuery from '@context/users/application/search/searchUsersQuery';
import SearchUsersQueryHandler from '@context/users/application/search/searchUsersQueryHandler';
import UserCreator from '@context/users/application/create/userCreator';
import UserUpdater from '@context/users/application/update/userUpdater';
import UserRemover from '@context/users/application/delete/userRemover';
import UserMongoRepository from '@context/users/infrastructure/persistence/mongo/userMongoRepository';
import InMemorySyncEventBus from '@context/shared/infrastructure/eventBus/inMemorySyncEventBus';
import { MongoClient } from 'mongodb';
import UpdateUserCommandHandler from '@context/users/application/update/updateUserCommandHandler';
import RemoveUserCommandHandler from '@context/users/application/delete/removeUserCommandHandler';
import UpdateUserCommand from '@context/users/application/update/updateUserCommand';
import MongoClientFactory from '@context/shared/infrastructure/mongo/mongoClientFactory';
import Command from '@context/shared/domain/commandBus/command';
import RemoveUserCommand from '@context/users/application/delete/removeUserCommand';
import PasswordChanger from '@context/users/application/changePassword/passwordChanger';
import UserDisabler from '@context/users/application/disable/userDisabler';
import UserLoggerIn from '@context/users/application/login/userLoggerIn';
import UserLoggerOut from '@context/users/application/logout/userLoggerOut';
import PasswordGenerator from "@context/users/infrastructure/persistence/mongo/passwordGenerator";
import PasswordValidator from "@context/users/infrastructure/persistence/mongo/passwordValidator";
import ChangePasswordCommandHandler from '@context/users/application/changePassword/changePasswordCommandHandler';
import DisableUserCommandHandler from '@context/users/application/disable/disableUserCommandHandler';
import LogInUserQueryHandler from '@context/users/application/login/loginUserQueryHandler';
import LogOutUserCommandHandler from '@context/users/application/logout/logoutUserCommandHandler';
import LogInUserQuery from '@context/users/application/login/loginUserQuery';
import ChangePasswordCommand from '@context/users/application/changePassword/changePasswordCommand';
import DisableUserCommand from '@context/users/application/disable/disableUserCommand';
import LogoutUserCommand from '@context/users/application/logout/logoutUserCommand';
import Tokenator from '@context/users/infrastructure/persistence/mongo/tokenator';
import RefreshTokenQueryHandler from '@context/users/application/refreshToken/refreshTokenQueryHandler';
import TokenRefresher from '@context/users/application/refreshToken/tokenRefresher';
import RefreshTokenQuery from '@context/users/application/refreshToken/refreshTokenQuery';
import RoleMongoRepository from '@context/roles/infrastructure/persistence/mongo/roleMongoRepository';
import FindRoleQueryHandler from '@context/roles/application/find/findRoleQueryHandler';
import RoleFinder from '@context/roles/application/find/roleFinder';
import FindRoleQuery from '@context/roles/application/find/findRoleQuery';
import InMemoryQueryBus from '@context/shared/infrastructure/queryBus/inMemoryQueryBus';
import QueryHandlersInformation from '@context/shared/infrastructure/queryBus/queryHandlersInformation';
import RoleRemover from '@context/roles/application/delete/roleRemover';
import RemoveRoleCommandHandler from '@context/roles/application/delete/removeRoleCommandHandler';
import RemoveRoleCommand from '@context/roles/application/delete/removeRoleCommand';
import InMemoryCommandBus from '@context/shared/infrastructure/commandBus/inMemoryCommandBus';
import CommandHandlersInformation from '@context/shared/infrastructure/commandBus/commandHandlersInformation';
import RoleCreator from '@context/roles/application/create/roleCreator';
import CreateRoleQueryHandler from '@context/roles/application/create/createRoleQueryHandler';
import CreateRoleQuery from '@context/roles/application/create/createRoleQuery';
import RoleUpdater from '@context/roles/application/update/roleUpdater';
import UpdateRoleCommandHandler from '@context/roles/application/update/updateRoleCommandHandler';
import UpdateRoleCommand from '@context/roles/application/update/updateRoleCommand';
import RedisClientFactory, { RedisConfig } from '@context/shared/infrastructure/redis/redisClientFactory';
import TokenRepository from '@context/users/infrastructure/persistence/redis/tokenRedisRespository';
import { RedisClientType } from "redis";

const dependencies = new Map();

const client = MongoClientFactory.createClient('users', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27028/'
});

const roleClient = MongoClientFactory.createClient('roles', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27028/'
});

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6378;
const redisConfig: RedisConfig = { url: 
    `redis://${redisHost}:${redisPort}`
};
const tokenClient = RedisClientFactory.createClient('tokens', redisConfig);

const userRepository = new UserMongoRepository(client as unknown as MongoClient);
const roleRepository = new RoleMongoRepository(roleClient as unknown as MongoClient);
const tokenRepository = new TokenRepository(tokenClient as unknown as RedisClientType);

const eventBus = new InMemorySyncEventBus();
const queryBus = new InMemoryQueryBus(new QueryHandlersInformation([]));
const commandBus = new InMemoryCommandBus(new CommandHandlersInformation([]));

const passwordGenerator = new PasswordGenerator();
const passwordValidator = new PasswordValidator();
const tokenator = new Tokenator();

const userCreator = new UserCreator(userRepository, eventBus, queryBus, commandBus);
const userUpdater = new UserUpdater(userRepository, eventBus, queryBus, commandBus);
const userRemover = new UserRemover(userRepository, eventBus);

const createUserCommandHandler = new CreateUserCommandHandler(userCreator);
const updateUserCommandHandler = new UpdateUserCommandHandler(userUpdater);
const removeUserCommandHandler = new RemoveUserCommandHandler(userRemover);

const userFinder = new UserFinder(userRepository);
const usersSearcher = new UsersSearcher(userRepository);
const tokenRefresher = new TokenRefresher(userRepository, tokenator, tokenRepository, queryBus);

const findUserQueryHandler = new FindUserQueryHandler(userFinder);
const searchUsersQueryHandler = new SearchUsersQueryHandler(usersSearcher);
const refreshTokenQueryHandler = new RefreshTokenQueryHandler(tokenRefresher);

const passwordChanger = new PasswordChanger(userRepository,passwordGenerator,passwordValidator);
const userDisabler = new UserDisabler(userRepository, eventBus);
const userLoggerIn = new UserLoggerIn(userRepository, tokenator, passwordValidator, queryBus);
const userLoggerOut = new UserLoggerOut(tokenator, tokenRepository) ;

const changePasswordCommandHandler = new ChangePasswordCommandHandler(passwordChanger);
const disableUserCommandHandler = new DisableUserCommandHandler(userDisabler);
const logOutUserCommandHandler = new LogOutUserCommandHandler(userLoggerOut);
const logInUserQueryHandler = new LogInUserQueryHandler(userLoggerIn);

const commandHandlers = new Map<Command, any>();
const queryHandlers = new Map<any, any>();

/* External dependencies */
const findRole = new RoleFinder(roleRepository);
const findRoleQueryHandler = new FindRoleQueryHandler(findRole);

const createRole = new RoleCreator(roleRepository, eventBus);
const createRoleQueryHandler = new CreateRoleQueryHandler(createRole);

const updateRole = new RoleUpdater(roleRepository, eventBus);
const updateRoleCommandHandler = new UpdateRoleCommandHandler(updateRole);

const removeRole = new RoleRemover(roleRepository, eventBus);
const removeRoleCommandHandler = new RemoveRoleCommandHandler(removeRole);
/* */

commandHandlers.set(CreateUserCommand, createUserCommandHandler);
commandHandlers.set(UpdateUserCommand, updateUserCommandHandler);
commandHandlers.set(RemoveUserCommand, removeUserCommandHandler);
commandHandlers.set(ChangePasswordCommand, changePasswordCommandHandler);
commandHandlers.set(DisableUserCommand, disableUserCommandHandler);
commandHandlers.set(LogoutUserCommand, logOutUserCommandHandler);

queryHandlers.set(FindUserQuery, findUserQueryHandler);
queryHandlers.set(SearchUsersQuery, searchUsersQueryHandler);
queryHandlers.set(LogInUserQuery, logInUserQueryHandler);
queryHandlers.set(RefreshTokenQuery, refreshTokenQueryHandler)

queryHandlers.set(FindRoleQuery, findRoleQueryHandler);
commandHandlers.set(RemoveRoleCommand, removeRoleCommandHandler);
queryHandlers.set(CreateRoleQuery, createRoleQueryHandler);
commandHandlers.set(UpdateRoleCommand, updateRoleCommandHandler);

dependencies.set('handlers', { command: commandHandlers, query: queryHandlers });
dependencies.set('repositories', { repository: userRepository });
dependencies.set('buses', { query: queryBus, command: commandBus });

export { dependencies };