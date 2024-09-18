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
import TokenGenerator from '@context/users/infrastructure/persistence/mongo/tokenGenerator';

const dependencies = new Map();

const client = MongoClientFactory.createClient('users', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});
const userRepository = new UserMongoRepository(client as unknown as MongoClient);
const eventBus = new InMemorySyncEventBus();
const passwordGenerator = new PasswordGenerator();
const passwordValidator = new PasswordValidator();
const tokenGenerator = new TokenGenerator();

const userCreator = new UserCreator(userRepository, eventBus);
const userUpdater = new UserUpdater(userRepository, eventBus);
const userRemover = new UserRemover(userRepository, eventBus);

const createUserCommandHandler = new CreateUserCommandHandler(userCreator);
const updateUserCommandHandler = new UpdateUserCommandHandler(userUpdater);
const removeUserCommandHandler = new RemoveUserCommandHandler(userRemover);

const userFinder = new UserFinder(userRepository);
const usersSearcher = new UsersSearcher(userRepository);

const findUserQueryHandler = new FindUserQueryHandler(userFinder);
const searchUsersQueryHandler = new SearchUsersQueryHandler(usersSearcher);

const passwordChanger = new PasswordChanger(userRepository,passwordGenerator,passwordValidator);
const userDisabler = new UserDisabler(userRepository, eventBus);
const userLoggerIn = new UserLoggerIn(userRepository, tokenGenerator);
const userLoggerOut = new UserLoggerOut(userRepository);

const changePasswordCommandHandler = new ChangePasswordCommandHandler(passwordChanger);
const disableUserCommandHandler = new DisableUserCommandHandler(userDisabler);
const logOutUserCommandHandler = new LogOutUserCommandHandler(userLoggerOut);
const logInUserQueryHandler = new LogInUserQueryHandler(userLoggerIn);

const commandHandlers = new Map<Command, any>();
const queryHandlers = new Map<any, any>();

commandHandlers.set(CreateUserCommand, createUserCommandHandler);
commandHandlers.set(UpdateUserCommand, updateUserCommandHandler);
commandHandlers.set(RemoveUserCommand, removeUserCommandHandler);
commandHandlers.set(ChangePasswordCommand, changePasswordCommandHandler);
commandHandlers.set(DisableUserCommand, disableUserCommandHandler);
commandHandlers.set(LogoutUserCommand, logOutUserCommandHandler);

queryHandlers.set(FindUserQuery, findUserQueryHandler);
queryHandlers.set(SearchUsersQuery, searchUsersQueryHandler);
queryHandlers.set(LogInUserQuery, logInUserQueryHandler);

dependencies.set('handlers', { command: commandHandlers, query: queryHandlers });
dependencies.set('repositories', { userRepository });

export { dependencies };