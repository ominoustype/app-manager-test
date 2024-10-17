import { Request, Response } from 'express'
import CreateDocumentCommand from '@context/documents/application/create/createDocumentCommand'
import FindDocumentQuery from '@context/documents/application/find/findDocumentQuery'
import SearchDocumentsQuery from '@context/documents/application/search/searchDocumentsQuery'
import UpdateDocumentCommand from '@context/documents/application/update/updateDocumentCommand'
import RemoveDocumentCommand from '@context/documents/application/delete/removeDocumentCommand'

import { dependencies } from './application.di'
import SearchByEnvironmentDocumentsQuery from '@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQuery'
import MoveDocumentCommand from '@context/documents/application/move/moveDocumentCommand'

// You will export functions that will be the controllers for the rest services
export async function searchDocuments(req: Request, res: Response) {
    console.log('Request for searchDocuments Triggered')

    const handler = dependencies.get('handlers').query.get(SearchDocumentsQuery);

    const result = await handler.handle(
        new SearchDocumentsQuery({
            ...req.query,
            page_size: req.query.page_size ? parseInt(req.query.page_size as string) : undefined,
            page: req.query.page ? parseInt(req.query.page as string) : undefined
        })
    );

    res.header("content-type", 'application/json')
    res.status(200).send({
        body: JSON.stringify({ 
            result: result.documents,
            count: result.documentsCounter
        }),
    })
}

export async function searchByEnvironmentDocuments(req: Request, res: Response) {
    console.log('Request for searchByEnvironmentDocuments Triggered')

    const handler = dependencies.get('handlers').query.get(SearchByEnvironmentDocumentsQuery);

    const result = await handler.handle(
        new SearchByEnvironmentDocumentsQuery({
            ...req.query,
            environment: req.query.environment?.toString() ?? "",
        })
    );

    res.header("content-type", 'application/json')
    res.status(200).send({
        body: JSON.stringify({ 
            result: result.documents
        }),
    })
}

export async function findDocument(req: Request, res: Response) {
    console.log('Request for findDocument Triggered')
    const { id } = req.params

    const handler = dependencies.get('handlers').query.get(FindDocumentQuery);

    console.log('Id to find', id)

    try {
        const response = await handler.handle(
            new FindDocumentQuery({ id })
        );

        res.header("content-type", 'application/json')
        res.status(200).send({
            body: JSON.stringify(response.primitives)
        });
    } catch (e) {
        res.status(404).send({ error: e });
    }
}

export async function createDocument(req: Request, res: Response) {
    console.log('Request for createDocument Triggered')
    
    const handler = dependencies.get('handlers').command.get(CreateDocumentCommand);

    try {
        await handler.handle(new CreateDocumentCommand(req.body));

        res.status(201).send();
    } catch (e) {
        return e;
    }  
}

export async function updateDocument(req: Request, res: Response) {
    console.log('Request for updateDocument Triggered')

    const { id } = req.params

    const handler = dependencies.get('handlers').command.get(UpdateDocumentCommand);

    console.log('Id to update', id)

    try {
        await handler.handle(
            new UpdateDocumentCommand({
                id: id,
                ...req.body
            })
        );

        res.status(204).send()
    } catch (e) {
        return e;
    }
}

export async function moveDocument(req: Request, res: Response) {
    console.log('Request for moveDocument Triggered')

    const { documentId, newEnvironmentId } = req.params

    const handler = dependencies.get('handlers').command.get(MoveDocumentCommand);

    console.log('Id to move', documentId)

    try {
        await handler.handle(
            new MoveDocumentCommand({
                documentId,
                newEnvironmentId,
                ...req.body
            })
        );

        res.status(204).send()
    } catch (e) {
        return e;
    }
}

export async function deleteDocument(req: Request, res: Response) {
    console.log('Request for deleteDocument Triggered')
    const { id } = req.params

    const handler = dependencies.get('handlers').command.get(RemoveDocumentCommand);

    console.log('Id to delete', id)

    try {
        await handler.handle(
            new RemoveDocumentCommand({
                id: id
            })
        );

        res.status(204).send()
    } catch (e) {
        return e;
    }
}