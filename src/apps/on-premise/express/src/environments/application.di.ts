import InMemorySyncEventBus from "@context/shared/infrastructure/eventBus/inMemorySyncEventBus";
import EnvironmentMongoRepository from "../../../../../contexts/environments/dist/infrastructure/environmentMongoRepository";
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

export const HANDLERS = "handlers";
export const REPOSITORIES = "repositories"

const dependencies = new Map();

const client = MongoClientFactory.createClient('environments', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});

const eventBus = new InMemorySyncEventBus();
const environmentRepository = new EnvironmentMongoRepository(client as unknown as MongoClient);

const environmentCreator = new EnvironmentCreator(environmentRepository, eventBus);
const environmentUpdater = new EnvironmentUpdater(environmentRepository, eventBus);
const environmentRemover = new EnvironmentRemover(environmentRepository, eventBus);

const environmentFinder = new EnvironmentFinder(environmentRepository);
const environmentSearcher = new EnvironmentsSearcher(environmentRepository);

const createEnvironmentCommandHandler = new CreateEnvironmentCommandHandler(environmentCreator);
const updateEnvironmentCommandHandler = new UpdateEnvironmentCommandHandler(environmentUpdater);
const removeEnvironmentCommandHandler = new RemoveEnvironmentCommandHandler(environmentRemover);

const findEnvironmentQueryHandler =  new FindEnvironmentQueryHandler(environmentFinder);
const searchEnvironmentsQueryHandler = new SearchEnvironmentsQueryHandler(environmentSearcher);

const commandHandlers = new Map<Command,any>();
const queryHandlers = new Map<any, any>();

commandHandlers.set(CreateEnvironmentCommand, createEnvironmentCommandHandler);
commandHandlers.set(UpdateEnvironmentCommand, updateEnvironmentCommandHandler);
commandHandlers.set(RemoveEnvironmentCommand, removeEnvironmentCommandHandler);

queryHandlers.set(FindEnvironmentQuery, findEnvironmentQueryHandler);
queryHandlers.set(SearchEnvironmentsQuery, searchEnvironmentsQueryHandler);

dependencies.set(HANDLERS, {query: queryHandlers, command: commandHandlers});
dependencies.set(REPOSITORIES, { environmentRepository });

export { dependencies };
