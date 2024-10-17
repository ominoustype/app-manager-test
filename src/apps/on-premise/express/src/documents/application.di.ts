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

const dependencies = new Map();

const client = MongoClientFactory.createClient('documents', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});
const documentRepository = new DocumentMongoRepository(client as unknown as MongoClient);
const eventBus = new InMemorySyncEventBus();
const queryBus = new InMemoryQueryBus(new QueryHandlersInformation([]));

const documentCreator = new DocumentCreator(documentRepository, eventBus);
const documentUpdater = new DocumentUpdater(documentRepository, eventBus);
const documentMover = new DocumentMover(documentRepository, eventBus, queryBus);
const documentRemover = new DocumentRemover(documentRepository, eventBus);

const createDocumentCommandHandler = new CreateDocumentCommandHandler(documentCreator);
const updateDocumentCommandHandler = new UpdateDocumentCommandHandler(documentUpdater);
const moveDocumentCommandHandler = new MoveDocumentCommandHandler(documentMover);
const removeDocumentCommandHandler = new RemoveDocumentCommandHandler(documentRemover);

const documentFinder = new DocumentFinder(documentRepository);
const documentsSearcher = new DocumentsSearcher(documentRepository);
const documentsSearcherByEnvironment = new DocumentsByEnvironmentSearcher(documentRepository);

const findDocumentQueryHandler = new FindDocumentQueryHandler(documentFinder);
const searchDocumentsQueryHandler = new SearchDocumentsQueryHandler(documentsSearcher);
const searchByEnvironmentDocumentsQueryHandler = new SearchByEnvironmentDocumentsQueryHandler(documentsSearcherByEnvironment);

const commandHandlers = new Map<Command, any>();
const queryHandlers = new Map<any, any>();

commandHandlers.set(CreateDocumentCommand, createDocumentCommandHandler);
commandHandlers.set(UpdateDocumentCommand, updateDocumentCommandHandler);
commandHandlers.set(MoveDocumentCommand, moveDocumentCommandHandler);
commandHandlers.set(RemoveDocumentCommand, removeDocumentCommandHandler);

queryHandlers.set(FindDocumentQuery, findDocumentQueryHandler);
queryHandlers.set(SearchDocumentsQuery, searchDocumentsQueryHandler);
queryHandlers.set(SearchByEnvironmentDocumentsQuery, searchByEnvironmentDocumentsQueryHandler);

dependencies.set('handlers', { command: commandHandlers, query: queryHandlers });
dependencies.set('repositories', { documentRepository });

export { dependencies };