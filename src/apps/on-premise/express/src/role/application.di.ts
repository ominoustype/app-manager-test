import InMemorySyncEventBus from "@context/shared/infrastructure/eventBus/inMemorySyncEventBus";
import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import RoleMongoRepository from "@context/role/infrastructure/persistence/mongo/roleMongoRepository";
import { MongoClient } from 'mongodb'
import RoleCreator from "@context/role/application/create/roleCreator";
import RoleUpdater from "@context/role/application/update/roleUpdater";
import RoleRemover from "@context/role/application/delete/roleRemover";
import RoleFinder from "@context/role/application/find/roleFinder";
import RolesSearcher from "@context/role/application/search/rolesSearcher";
import UpdateRoleCommandHandler from '@context/role/application/update/updateRoleCommandHandler';
import CreateRoleCommandHandler from '@context/role/application/create/createRoleCommandHandler';
import RemoveRoleCommandHandler from '@context/role/application/delete/removeRoleCommandHandler';
import FindRoleQueryHandler from '@context/role/application/find/findRoleQueryHandler';
import SearchRolesQueryHandler from '@context/role/application/search/searchRolesQueryHandler';
import Command from '@context/shared/domain/commandBus/command';
import CreateRoleCommand from "@context/role/application/create/createRoleCommand";
import UpdateRoleCommand from "@context/role/application/update/updateRoleCommand";
import RemoveRoleCommand from "@context/role/application/delete/removeRoleCommand";
import SearchRolesQuery from "@context/role/application/search/searchRolesQuery";
import FindRoleQuery from "@context/role/application/find/findRoleQuery";

const HANDLERS = "handlers";
export const REPOSITORIES = "repositories"

const client = MongoClientFactory.createClient('role', { 
    url: process.env.MONGODB_URI || 'mongodb://localhost:27018/' 
});    

const eventBus = new InMemorySyncEventBus;
const repository = new RoleMongoRepository(client as unknown as MongoClient);

const dependencies = new Map();

const roleCreator = new RoleCreator(repository, eventBus);
const roleUpdater = new RoleUpdater(repository, eventBus);
const roleRemover = new RoleRemover(repository, eventBus);

const roleFinder = new RoleFinder(repository);
const rolesSearcher = new RolesSearcher(repository);

const createRoleCommandHandler = new CreateRoleCommandHandler(roleCreator);
const updateRoleCommandHandler = new UpdateRoleCommandHandler(roleUpdater);
const removeRoleCommandHandler = new RemoveRoleCommandHandler(roleRemover);

const findRoleQueryHandler =  new FindRoleQueryHandler(roleFinder);
const searchRoleQueryHandler = new SearchRolesQueryHandler(rolesSearcher);

const commandHandlers = new Map<Command, any>();
commandHandlers.set(CreateRoleCommand, createRoleCommandHandler);
commandHandlers.set(UpdateRoleCommand, updateRoleCommandHandler);
commandHandlers.set(RemoveRoleCommand, removeRoleCommandHandler);

const queryHandlers = new Map<any, any>();
queryHandlers.set(FindRoleQuery, findRoleQueryHandler);
queryHandlers.set(SearchRolesQuery, searchRoleQueryHandler);
queryHandlers.set(FindRoleQuery, findRoleQueryHandler);

dependencies.set(HANDLERS, { command: commandHandlers, query: queryHandlers });
dependencies.set(REPOSITORIES, { repository });

export { dependencies, HANDLERS };
