// Here you need to load the whole dependencies (repositories, use cases, whatever you need to execute things)
// Utiliza new Map() - {handler: new Map(), repositories: new Map()}

import CreateDocumentCommand from '@context/documents/application/create/createDocumentCommand';
import CreateDocumentCommandHandler from '@context/documents/application/create/createDocumentCommandHandler';
import DocumentFinder from '@context/documents/application/find/documentFinder';
import DocumentsSearcher from '@context/documents/application/search/documentsSearcher';
import FindDocumentQueryHandler from '@context/documents/application/find/findDocumentQueryHandler';
import FindDocumentQuery from '@context/documents/application/find/findDocumentQuery';
import SearchDocumentsQuery from '@context/documents/application/search/searchDocumentsQuery';
import SearchDocumentsQueryHandler from '@context/documents/application/search/searchDocumentsQueryHandler';
import DocumentCreator from '@context/documents/application/create/documentCreator';
import DocumentUpdater from '@context/documents/application/update/documentUpdater';
import DocumentRemover from '@context/documents/application/delete/documentRemover';
import DocumentMongoRepository from '@context/documents/infrastructure/persistence/mongo/documentMongoRepository';
import InMemorySyncEventBus from '@context/shared/infrastructure/eventBus/inMemorySyncEventBus';
import { MongoClient } from 'mongodb';
import UpdateDocumentCommandHandler from '@context/documents/application/update/updateDocumentCommandHandler';
import RemoveDocumentCommandHandler from '@context/documents/application/delete/removeDocumentCommandHandler';
import UpdateDocumentCommand from '@context/documents/application/update/updateDocumentCommand';
import MongoClientFactory from '@context/shared/infrastructure/mongo/mongoClientFactory';
import Command from '@context/shared/domain/commandBus/command';
import RemoveDocumentCommand from '@context/documents/application/delete/removeDocumentCommand';
import DocumentMover from '@context/documents/application/move/documentMover';
import InMemoryQueryBus from '@context/shared/infrastructure/queryBus/inMemoryQueryBus';
import QueryHandlersInformation from '@context/shared/infrastructure/queryBus/queryHandlersInformation';
import MoveDocumentCommandHandler from '@context/documents/application/move/moveDocumentCommandHandler';
import MoveDocumentCommand from '@context/documents/application/move/moveDocumentCommand';
import DocumentsByEnvironmentSearcher from '@context/documents/application/searchByEnvironment/documentsByEnvironmentSearcher';
import SearchByEnvironmentDocumentsQueryHandler from '@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQueryHandler';
import SearchByEnvironmentDocumentsQuery from '@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQuery';
import FindEnvironmentQueryHandler from '@context/environments/application/find/findEnvironmentQueryHandler';
import EnvironmentMongoRepository from '@context/environments/infrastructure/environmentMongoRepository';
import EnvironmentFinder from '@context/environments/application/find/environmentFinder';
import FindEnvironmentQuery from '@context/environments/application/find/findEnvironmentQuery';
import DeploymentConfigsMongoRepository from '@context/deploymentConfigs/infrastructure/persistence/mongoose/deploymentConfigsMongoRepository';
import DocumentPusher from '@context/documents/application/push/documentPusher';
import PushDocumentCommandHandler from '@context/documents/application/push/pushDocumentCommandHandler';
import PushDocumentCommand from '@context/documents/application/push/pushDocumentCommand';
import InMemoryCommandBus from '@context/shared/infrastructure/commandBus/inMemoryCommandBus';
import CommandHandlersInformation from '@context/shared/infrastructure/commandBus/commandHandlersInformation';
import DocumentDeployer from '@context/documents/application/deploy/documentDeployer';
import DeployDocumentCommandHandler from '@context/documents/application/deploy/deployDocumentCommandHandler';
import DeployDocumentCommand from '@context/documents/application/deploy/deployDocumentCommand';
import DeploymentConfigsDeployer from '@context/deploymentConfigs/application/deploy/deploymentConfigsDeployer';
import DeployDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommandHandler';
import DeployDeploymentConfigsCommand from '@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommand';
import UpdateEnvironmentCommand from '@context/environments/application/update/updateEnvironmentCommand';
import DocumentRestorer from '@context/documents/application/restore/documentRestorer';
import RestoreDocumentCommandHandler from '@context/documents/application/restore/restoreDocumentCommandHandler';
import RestoreDocumentCommand from '@context/documents/application/restore/restoreDocumentCommand';
import CreateDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommandHandler';
import UpdateDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommandHandler';
import DeploymentConfigsByEnvironmentIsDeployedSearcher from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/deploymentConfigsByEnvironmentIsDeployedSearcher';
import SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQueryHandler';
import CreateDeploymentConfigsCommand from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommand';
import UpdateDeploymentConfigsCommand from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommand';
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery';
import DeploymentConfigsCreator from '@context/deploymentConfigs/application/create/deploymentConfigsCreator';
import DeploymentConfigsUpdater from '@context/deploymentConfigs/application/update/deploymentConfigsUpdater';
import DeployEnvironmentCommandHandler from '@context/environments/application/deploy/deployEnvironmentCommandHandler';
import DeployEnvironmentCommand from '@context/environments/application/deploy/deployEnvironmentCommand';
import EnvironmentDeployer from '@context/environments/application/deploy/environmentDeployer';
import DocumentUndoPusher from '@context/documents/application/undoPush/documentUndoPusher';
import UndoPushDocumentCommandHandler from '@context/documents/application/undoPush/undoPushDocumentCommandHandler';
import UndoPushDocumentCommand from '@context/documents/application/undoPush/undoPushDocumentCommand';

export const BUSES = "buses"

const dependencies = new Map();

const client = MongoClientFactory.createClient('documents', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});

const environmentClient = MongoClientFactory.createClient('environments', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});

const deploymentConfigsClient = MongoClientFactory.createClient('deploymentConfigs', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});

const documentRepository = new DocumentMongoRepository(client as unknown as MongoClient);
const deploymentConfigsRepository = new DeploymentConfigsMongoRepository(deploymentConfigsClient as unknown as MongoClient);
const environmentRepository = new EnvironmentMongoRepository(environmentClient as unknown as MongoClient);

const eventBus = new InMemorySyncEventBus();
const queryBus = new InMemoryQueryBus(new QueryHandlersInformation([]));
const commandBus = new InMemoryCommandBus(new CommandHandlersInformation([]));

const documentCreator = new DocumentCreator(documentRepository, eventBus);
const documentUpdater = new DocumentUpdater(documentRepository, eventBus);
const documentRemover = new DocumentRemover(documentRepository, eventBus);
const documentMover = new DocumentMover(documentRepository, eventBus, queryBus);
const documentPusher = new DocumentPusher(documentRepository, eventBus, commandBus, queryBus);
const documentDeployer = new DocumentDeployer(documentRepository, eventBus, queryBus, commandBus);
const documentRestorer = new DocumentRestorer(documentRepository, eventBus);
const documentUndoPusher = new DocumentUndoPusher(documentRepository, eventBus, queryBus, commandBus)

const createDocumentCommandHandler = new CreateDocumentCommandHandler(documentCreator);
const updateDocumentCommandHandler = new UpdateDocumentCommandHandler(documentUpdater);
const moveDocumentCommandHandler = new MoveDocumentCommandHandler(documentMover);
const removeDocumentCommandHandler = new RemoveDocumentCommandHandler(documentRemover);
const pushDocumentCommandHandler = new PushDocumentCommandHandler(documentPusher);
const deployDocumentCommandHandler = new DeployDocumentCommandHandler(documentDeployer);
const restoreDocumentCommandHandler = new RestoreDocumentCommandHandler(documentRestorer);
const undoPushDocumentCommandHandler = new UndoPushDocumentCommandHandler(documentUndoPusher);

const documentFinder = new DocumentFinder(documentRepository);
const documentsSearcher = new DocumentsSearcher(documentRepository);
const documentsSearcherByEnvironment = new DocumentsByEnvironmentSearcher(documentRepository);

const findDocumentQueryHandler = new FindDocumentQueryHandler(documentFinder);
const searchDocumentsQueryHandler = new SearchDocumentsQueryHandler(documentsSearcher);
const searchByEnvironmentDocumentsQueryHandler = new SearchByEnvironmentDocumentsQueryHandler(documentsSearcherByEnvironment);

const commandHandlers = new Map<Command, any>();
const queryHandlers = new Map<any, any>();

// External dependencies
    // DeploymentConfigs
const deploymentConfigsCreator = new DeploymentConfigsCreator(deploymentConfigsRepository, eventBus);
const deploymentConfigsUpdater = new DeploymentConfigsUpdater(deploymentConfigsRepository, eventBus)
const deploymentConfigsDeployer = new DeploymentConfigsDeployer(deploymentConfigsRepository, eventBus);
const deploymentConfigsByEnvironmentIsDeployedSearcher = new DeploymentConfigsByEnvironmentIsDeployedSearcher(deploymentConfigsRepository);

const createDeploymentConfigsCommandHandler = new CreateDeploymentConfigsCommandHandler(deploymentConfigsCreator);
const updateDeploymentConfigsCommandHandler = new UpdateDeploymentConfigsCommandHandler(deploymentConfigsUpdater);
const deployDeploymentConfigsCommandHandler = new DeployDeploymentConfigsCommandHandler(deploymentConfigsDeployer);
const searchByEnviromentIsDeployedDeploymentConfigsQueryHandler = new SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler(deploymentConfigsByEnvironmentIsDeployedSearcher);

    // Environments
const environmentFinder = new EnvironmentFinder(environmentRepository);
const findEnviromentQueryHandler = new FindEnvironmentQueryHandler(environmentFinder);
const environmentDeployer = new EnvironmentDeployer(environmentRepository, eventBus);
const deployEnvironmentCommandHandler = new DeployEnvironmentCommandHandler(environmentDeployer);
//

commandHandlers.set(CreateDocumentCommand, createDocumentCommandHandler);
commandHandlers.set(UpdateDocumentCommand, updateDocumentCommandHandler);
commandHandlers.set(RemoveDocumentCommand, removeDocumentCommandHandler);
commandHandlers.set(MoveDocumentCommand, moveDocumentCommandHandler);
commandHandlers.set(PushDocumentCommand, pushDocumentCommandHandler);
commandHandlers.set(DeployDocumentCommand, deployDocumentCommandHandler);
commandHandlers.set(RestoreDocumentCommand, restoreDocumentCommandHandler);
commandHandlers.set(UndoPushDocumentCommand, undoPushDocumentCommandHandler);

commandHandlers.set(CreateDeploymentConfigsCommand, createDeploymentConfigsCommandHandler);
commandHandlers.set(UpdateDeploymentConfigsCommand, updateDeploymentConfigsCommandHandler);
commandHandlers.set(DeployDeploymentConfigsCommand, deployDeploymentConfigsCommandHandler);

commandHandlers.set(UpdateEnvironmentCommand, deployEnvironmentCommandHandler);
commandHandlers.set(DeployEnvironmentCommand, deployEnvironmentCommandHandler);

queryHandlers.set(FindDocumentQuery, findDocumentQueryHandler);
queryHandlers.set(SearchDocumentsQuery, searchDocumentsQueryHandler);
queryHandlers.set(SearchByEnvironmentDocumentsQuery, searchByEnvironmentDocumentsQueryHandler);
queryHandlers.set(FindEnvironmentQuery, findEnviromentQueryHandler);
queryHandlers.set(SearchByEnvironmentIsDeployedDeploymentConfigsQuery, searchByEnviromentIsDeployedDeploymentConfigsQueryHandler);

dependencies.set('handlers', { command: commandHandlers, query: queryHandlers });
dependencies.set('repositories', { repository: documentRepository });
dependencies.set(BUSES, {query: queryBus, command: commandBus})

export { dependencies };