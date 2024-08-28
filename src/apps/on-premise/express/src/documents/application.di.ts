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

const dependencies = new Map();

const client = MongoClientFactory.createClient('documents', {
    url: process.env.MONGODB_URI  || 'mongodb://localhost:27018/'
});
const documentRepository = new DocumentMongoRepository(client as unknown as MongoClient);
const eventBus = new InMemorySyncEventBus();

const documentCreator = new DocumentCreator(documentRepository, eventBus);
const documentUpdater = new DocumentUpdater(documentRepository, eventBus);
const documentRemover = new DocumentRemover(documentRepository, eventBus);

const createDocumentCommandHandler = new CreateDocumentCommandHandler(documentCreator);
const updateDocumentCommandHandler = new UpdateDocumentCommandHandler(documentUpdater);
const removeDocumentCommandHandler = new RemoveDocumentCommandHandler(documentRemover);

const documentFinder = new DocumentFinder(documentRepository);
const documentsSearcher = new DocumentsSearcher(documentRepository);

const findDocumentQueryHandler = new FindDocumentQueryHandler(documentFinder);
const searchDocumentsQueryHandler = new SearchDocumentsQueryHandler(documentsSearcher);

const commandHandlers = new Map<Command, any>();
const queryHandlers = new Map<any, any>();

commandHandlers.set(CreateDocumentCommand, createDocumentCommandHandler);
commandHandlers.set(UpdateDocumentCommand, updateDocumentCommandHandler);
commandHandlers.set(RemoveDocumentCommand, removeDocumentCommandHandler);

queryHandlers.set(FindDocumentQuery, findDocumentQueryHandler);
queryHandlers.set(SearchDocumentsQuery, searchDocumentsQueryHandler);

dependencies.set('handlers', { command: commandHandlers, query: queryHandlers });
dependencies.set('repositories', { documentRepository });

export { dependencies };