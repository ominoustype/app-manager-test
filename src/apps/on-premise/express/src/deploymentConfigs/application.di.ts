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

export const HANDLERS = "handlers";
export const REPOSITORIES = "repositories"

const dependencies = new Map();

const client = MongoClientFactory.createClient('deploymentConfigs', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});

const deploymentConfigsRepository = new DeploymentConfigsMongoRepository(client as unknown as MongoClient);
const eventBus = new InMemorySyncEventBus();

const deploymentConfigsFinder = new DeploymentConfigsFinder(deploymentConfigsRepository);
const deploymentConfigsCreator = new DeploymentConfigsCreator(deploymentConfigsRepository, eventBus);
const deploymentConfigsUpdater = new DeploymentConfigsUpdater(deploymentConfigsRepository, eventBus);
const deploymentConfigsRemover = new DeploymentConfigsRemover(deploymentConfigsRepository, eventBus);
const deploymentConfigsSearcher = new DeploymentsConfigsSearcher(deploymentConfigsRepository);

const findDeploymentConfigsQueryHandler = new FindDeploymentConfigsQueryHandler(deploymentConfigsFinder);
const createDeploymentConfigsCommandHandler = new CreateDeploymentConfigsCommandHandler(deploymentConfigsCreator);
const updateDeploymentConfigsCommandHandler = new UpdateDeploymentConfigsCommandHandler(deploymentConfigsUpdater);
const removeDeploymentConfigsCommandHandler = new RemoveDeploymentConfigsCommandHandler(deploymentConfigsRemover);
const searchDeploymentConfigsQueryHandler = new SearchDeploymentsConfigsQueryHandler(deploymentConfigsSearcher);

const queryHandlers = new Map<any, any>();
const commandHandlers = new Map<Command, any>();

queryHandlers.set(FindDeploymentConfigsQuery, findDeploymentConfigsQueryHandler);
queryHandlers.set(SearchDeploymentsConfigsQuery, searchDeploymentConfigsQueryHandler);

commandHandlers.set(CreateDeploymentConfigsCommand, createDeploymentConfigsCommandHandler);
commandHandlers.set(UpdateDeploymentConfigsCommand, updateDeploymentConfigsCommandHandler);
commandHandlers.set(RemoveDeploymentConfigsCommand, removeDeploymentConfigsCommandHandler);

dependencies.set(HANDLERS, {query: queryHandlers, command: commandHandlers});
dependencies.set(REPOSITORIES, { deploymentConfigsRepository });

export { dependencies };

