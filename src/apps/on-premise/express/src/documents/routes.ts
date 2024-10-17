// You will define the routes and the link to the controllers
import { Express } from 'express'

import { searchDocuments, findDocument, createDocument, updateDocument, deleteDocument, searchByEnvironmentDocuments, moveDocument } from './controllers'

export default function loadDocuments(app: Express) {
    app.get('/documents', searchDocuments)
    app.get('/documents/byevironment', searchByEnvironmentDocuments)
    app.get('/documents/:id', findDocument)
    app.post('/documents', createDocument)
    app.put('/documents/:id', updateDocument)
    app.put('/documents/:documentId/move/:newEnvironmentId', moveDocument)
    app.delete('/documents/:id', deleteDocument)
}