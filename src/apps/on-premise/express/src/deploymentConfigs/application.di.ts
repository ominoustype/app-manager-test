import { MongoClient } from 'mongodb';
import MongoClientFactory from "@context/shared/infrastructure/mongo/mongoClientFactory";
import DeploymentConfigsMongoRepository from '@context/deploymentConfigs/infrastructure/persistence/mongoose/deploymentConfigsMongoRepository';
import InMemorySyncEventBus from '@context/shared/infrastructure/eventBus/inMemorySyncEventBus';
import DeploymentConfigsFinder from '@context/deploymentConfigs/application/find/deploymentConfigsFinder'
import DeploymentConfigsCreator from '@context/deploymentConfigs/application/create/deploymentConfigsCreator'
import DeploymentConfigsUpdater from '@context/deploymentConfigs/application/update/deploymentConfigsUpdater'
import DeploymentConfigsRemover from '@context/deploymentConfigs/application/delete/deploymentConfigsRemover'
import DeploymentsConfigsSearcher from '@context/deploymentConfigs/application/search/deploymentsConfigsSearcher'
import FindDeploymentConfigsQueryHandler from '@context/deploymentConfigs/application/find/findDeploymentConfigsQueryHandler';
import CreateDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommandHandler';
import UpdateDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommandHandler';
import RemoveDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/delete/removeDeploymentConfigsCommandHandler';
import SearchDeploymentsConfigsQueryHandler from '@context/deploymentConfigs/application/search/searchDeploymentsConfigsQueryHandler';
import Command from '@context/shared/domain/commandBus/command';
import FindDeploymentConfigsQuery from '@context/deploymentConfigs/application/find/findDeploymentConfigsQuery';
import SearchDeploymentsConfigsQuery from '@context/deploymentConfigs/application/search/searchDeploymentsConfigsQuery';
import CreateDeploymentConfigsCommand from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommand';
import UpdateDeploymentConfigsCommand from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommand';
import RemoveDeploymentConfigsCommand from '@context/deploymentConfigs/application/delete/removeDeploymentConfigsCommand';
import DeploymentConfigsDeployer from '@context/deploymentConfigs/application/deploy/deploymentConfigsDeployer';
import DeployDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommandHandler';
import DeployDeploymentConfigsCommand from '@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommand';
import InMemoryQueryBus from '@context/shared/infrastructure/queryBus/inMemoryQueryBus';
import QueryHandlersInformation from '@context/shared/infrastructure/queryBus/queryHandlersInformation';
import EnvironmentFinder from '@context/environments/application/find/environmentFinder';
import EnvironmentMongoRepository from '@context/environments/infrastructure/environmentMongoRepository';
import FindEnvironmentQueryHandler from '@context/environments/application/find/findEnvironmentQueryHandler';
import FindEnvironmentQuery from '@context/environments/application/find/findEnvironmentQuery';
import InMemoryCommandBus from '@context/shared/infrastructure/commandBus/inMemoryCommandBus';
import CommandHandlersInformation from '@context/shared/infrastructure/commandBus/commandHandlersInformation';
import SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQueryHandler';
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery';
import DeploymentConfigsByEnvironmentIsDeployedSearcher from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/deploymentConfigsByEnvironmentIsDeployedSearcher';

export const HANDLERS = "handlers";
export const REPOSITORIES = "repositories";
export const BUSES = "buses";

const dependencies = new Map();

const client = MongoClientFactory.createClient('deploymentConfigs', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});

const clientEnvironment = MongoClientFactory.createClient('environments', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});

const deploymentConfigsRepository = new DeploymentConfigsMongoRepository(client as unknown as MongoClient);
const environmentRepository = new EnvironmentMongoRepository(clientEnvironment as unknown as MongoClient);

const eventBus = new InMemorySyncEventBus();
const queryBus = new InMemoryQueryBus(new QueryHandlersInformation([]));
const commandBus = new InMemoryCommandBus(new CommandHandlersInformation([]));

const deploymentConfigsFinder = new DeploymentConfigsFinder(deploymentConfigsRepository);
const deploymentConfigsCreator = new DeploymentConfigsCreator(deploymentConfigsRepository, eventBus);
const deploymentConfigsUpdater = new DeploymentConfigsUpdater(deploymentConfigsRepository, eventBus);
const deploymentConfigsRemover = new DeploymentConfigsRemover(deploymentConfigsRepository, eventBus);
const deploymentConfigsSearcher = new DeploymentsConfigsSearcher(deploymentConfigsRepository);
const deploymentConfigsDeployer = new DeploymentConfigsDeployer(deploymentConfigsRepository, eventBus);
const deploymentConfigsByEnvironmentIsDeployedSearcher = new DeploymentConfigsByEnvironmentIsDeployedSearcher(deploymentConfigsRepository);

const findDeploymentConfigsQueryHandler = new FindDeploymentConfigsQueryHandler(deploymentConfigsFinder);
const createDeploymentConfigsCommandHandler = new CreateDeploymentConfigsCommandHandler(deploymentConfigsCreator);
const updateDeploymentConfigsCommandHandler = new UpdateDeploymentConfigsCommandHandler(deploymentConfigsUpdater);
const removeDeploymentConfigsCommandHandler = new RemoveDeploymentConfigsCommandHandler(deploymentConfigsRemover);
const searchDeploymentConfigsQueryHandler = new SearchDeploymentsConfigsQueryHandler(deploymentConfigsSearcher);
const deployDeploymentConfigsCommandHandler = new DeployDeploymentConfigsCommandHandler(deploymentConfigsDeployer);
const searchByEnvironmentIsDeployedDeploymentConfigsQueryHandler = new SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler(deploymentConfigsByEnvironmentIsDeployedSearcher);

const queryHandlers = new Map<any, any>();
const commandHandlers = new Map<Command, any>();

// External dependencies
const environmentFinder = new EnvironmentFinder(environmentRepository);
const findEnvironmentQueryHandler = new FindEnvironmentQueryHandler(environmentFinder);
queryHandlers.set(FindEnvironmentQuery, findEnvironmentQueryHandler);
//

queryHandlers.set(FindDeploymentConfigsQuery, findDeploymentConfigsQueryHandler);
queryHandlers.set(SearchDeploymentsConfigsQuery, searchDeploymentConfigsQueryHandler);
queryHandlers.set(SearchByEnvironmentIsDeployedDeploymentConfigsQuery, searchByEnvironmentIsDeployedDeploymentConfigsQueryHandler);

commandHandlers.set(CreateDeploymentConfigsCommand, createDeploymentConfigsCommandHandler);
commandHandlers.set(UpdateDeploymentConfigsCommand, updateDeploymentConfigsCommandHandler);
commandHandlers.set(RemoveDeploymentConfigsCommand, removeDeploymentConfigsCommandHandler);
commandHandlers.set(DeployDeploymentConfigsCommand, deployDeploymentConfigsCommandHandler);

dependencies.set(HANDLERS, {query: queryHandlers, command: commandHandlers});
dependencies.set(REPOSITORIES, { repository: deploymentConfigsRepository });
dependencies.set(BUSES, { query: queryBus, command: commandBus});

export { dependencies };

