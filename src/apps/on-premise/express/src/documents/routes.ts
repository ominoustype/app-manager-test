// You will define the routes and the link to the controllers
import { Express } from 'express'

import { searchDocuments, findDocument, createDocument, updateDocument, deleteDocument } from './controllers'

export default function loadDocuments(app: Express) {
    app.get('/documents', searchDocuments)
    app.get('/documents/:id', findDocument)
    app.post('/documents', createDocument)
    app.put('/documents/:id', updateDocument)
    app.delete('/documents/:id', deleteDocument)
}