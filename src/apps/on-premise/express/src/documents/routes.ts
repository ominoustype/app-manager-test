import { Express } from 'express'

import { searchDocuments, findDocument, createDocument, updateDocument, deleteDocument, 
    pushDocument, deployDocuments, restoreDocument, undoPushDocument } from './controllers'
import { auth } from '../middleware/auths'

export default function loadDocuments(app: Express) {
    app.get('/documents', auth, searchDocuments)
    app.get('/documents/:id', auth, findDocument)
    app.post('/documents', auth, createDocument)
    app.put('/documents/:id', auth, updateDocument)
    app.put('/documents/push/:id', auth, pushDocument)
    app.put('/documents/undoPush/:id', auth, undoPushDocument)
    app.put('/documents/restore/:id/:version', auth, restoreDocument)
    app.put('/documents/:environmentId/deploy', auth, deployDocuments)
    app.delete('/documents/:id', auth, deleteDocument) //TODO logic delete???
}
