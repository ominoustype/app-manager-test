// You will define the routes and the link to the controllers
import { Express } from 'express'

import { searchDocuments, findDocument, createDocument, updateDocument, deleteDocument, checkWritePermission } from './controllers'
import { auth } from '../middleware/auths'

export default function loadDocuments(app: Express) {
    app.get('/documents', auth, searchDocuments)
    app.get('/documents/:id', auth, findDocument)
    app.post('/documents', auth, checkWritePermission, createDocument)
    app.put('/documents/:id', auth, checkWritePermission, updateDocument)
    app.delete('/documents/:id', auth, checkWritePermission, deleteDocument)
}
