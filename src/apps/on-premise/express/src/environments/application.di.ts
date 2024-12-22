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

export const HANDLERS = "handlers";
export const REPOSITORIES = "repositories"
export const BUSES = "buses"

const dependencies = new Map();

const client = MongoClientFactory.createClient('environments', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27028/'
});

const clientDocuments = MongoClientFactory.createClient('documents', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27028/'
});

const environmentRepository = new EnvironmentMongoRepository(client as unknown as MongoClient);
const documentRepository = new DocumentMongoRepository(clientDocuments as unknown as MongoClient);

const eventBus = new InMemorySyncEventBus();
const queryBus = new InMemoryQueryBus(new QueryHandlersInformation([]));
const commandBus = new InMemoryCommandBus(new CommandHandlersInformation([]));

const environmentCreator = new EnvironmentCreator(environmentRepository, eventBus);
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
//

commandHandlers.set(CreateEnvironmentCommand, createEnvironmentCommandHandler);
commandHandlers.set(UpdateEnvironmentCommand, updateEnvironmentCommandHandler);
commandHandlers.set(RemoveEnvironmentCommand, removeEnvironmentCommandHandler);
commandHandlers.set(DeployEnvironmentCommand, deployEnvironmentCommandHandler);

queryHandlers.set(FindEnvironmentQuery, findEnvironmentQueryHandler);
queryHandlers.set(SearchEnvironmentsQuery, searchEnvironmentsQueryHandler);

dependencies.set(HANDLERS, {query: queryHandlers, command: commandHandlers });
dependencies.set(REPOSITORIES, { repository: environmentRepository });
dependencies.set(BUSES, {query: queryBus, command: commandBus})

export { dependencies };
