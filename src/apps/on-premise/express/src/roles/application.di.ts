import InMemorySyncEventBus from "@context/shared/infrastructure/eventBus/inMemorySyncEventBus";
import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import RoleMongoRepository from "@context/roles/infrastructure/persistence/mongo/roleMongoRepository";
import { MongoClient } from 'mongodb'
import RoleCreator from "@context/roles/application/create/roleCreator";
import RoleUpdater from "@context/roles/application/update/roleUpdater";
import RoleRemover from "@context/roles/application/delete/roleRemover";
import RoleFinder from "@context/roles/application/find/roleFinder";
import RolesSearcher from "@context/roles/application/search/rolesSearcher";
import UpdateRoleCommandHandler from '@context/roles/application/update/updateRoleCommandHandler';
import RemoveRoleCommandHandler from '@context/roles/application/delete/removeRoleCommandHandler';
import FindRoleQueryHandler from '@context/roles/application/find/findRoleQueryHandler';
import SearchRolesQueryHandler from '@context/roles/application/search/searchRolesQueryHandler';
import Command from '@context/shared/domain/commandBus/command';
import UpdateRoleCommand from "@context/roles/application/update/updateRoleCommand";
import RemoveRoleCommand from "@context/roles/application/delete/removeRoleCommand";
import SearchRolesQuery from "@context/roles/application/search/searchRolesQuery";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import CreateRoleQueryHandler from "@context/roles/application/create/createRoleQueryHandler";
import CreateRoleQuery from "@context/roles/application/create/createRoleQuery";

const HANDLERS = "handlers";
export const REPOSITORIES = "repositories"

const client = MongoClientFactory.createClient('roles', { 
    url: process.env.MONGODB_URI || 'mongodb://localhost:27028/' 
});    

const eventBus = new InMemorySyncEventBus;
const repository = new RoleMongoRepository(client as unknown as MongoClient);

const dependencies = new Map();

const roleFinder = new RoleFinder(repository);
const rolesSearcher = new RolesSearcher(repository);
const roleCreator = new RoleCreator(repository, eventBus);
const roleUpdater = new RoleUpdater(repository, eventBus);
const roleRemover = new RoleRemover(repository, eventBus);

const findRoleQueryHandler =  new FindRoleQueryHandler(roleFinder);
const searchRoleQueryHandler = new SearchRolesQueryHandler(rolesSearcher);
const createRoleQueryHandler = new CreateRoleQueryHandler(roleCreator); //
const updateRoleCommandHandler = new UpdateRoleCommandHandler(roleUpdater);
const removeRoleCommandHandler = new RemoveRoleCommandHandler(roleRemover);

const queryHandlers = new Map<any, any>();
queryHandlers.set(FindRoleQuery, findRoleQueryHandler);
queryHandlers.set(SearchRolesQuery, searchRoleQueryHandler);
queryHandlers.set(CreateRoleQuery, createRoleQueryHandler); //

const commandHandlers = new Map<Command, any>();
commandHandlers.set(UpdateRoleCommand, updateRoleCommandHandler);
commandHandlers.set(RemoveRoleCommand, removeRoleCommandHandler);

dependencies.set(HANDLERS, { command: commandHandlers, query: queryHandlers });
dependencies.set(REPOSITORIES, { repository: repository });

export { dependencies, HANDLERS };
