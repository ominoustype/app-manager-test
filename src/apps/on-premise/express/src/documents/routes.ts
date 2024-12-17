// You will define the routes and the link to the controllers
import { Express } from 'express'

import { searchDocuments, findDocument, createDocument, updateDocument, deleteDocument, 
    pushDocument, deployDocuments, restoreDocument, undoPushDocument } from './controllers'
//import { auth } from '../middleware/auths'

export default function loadDocuments(app: Express) {
    app.get('/documents', searchDocuments)
    app.get('/documents/:id', findDocument)
    app.post('/documents', createDocument)
    app.put('/documents/:id', updateDocument)
    app.put('/documents/push/:id', pushDocument)
    app.put('/documents/undoPush/:id', undoPushDocument)
    app.put('/documents/restore/:id/:version', restoreDocument)
    app.put('/documents/:environmentId/deploy', deployDocuments)
    app.delete('/documents/:id', deleteDocument)
}
