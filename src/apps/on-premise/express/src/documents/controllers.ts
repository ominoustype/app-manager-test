import { NextFunction, Request, Response } from 'express'
import CreateDocumentCommand from '@context/documents/application/create/createDocumentCommand'
import FindDocumentQuery from '@context/documents/application/find/findDocumentQuery'
import SearchDocumentsQuery from '@context/documents/application/search/searchDocumentsQuery'
import UpdateDocumentCommand from '@context/documents/application/update/updateDocumentCommand'
import RemoveDocumentCommand from '@context/documents/application/delete/removeDocumentCommand'
import { BUSES, dependencies, HANDLERS } from './application.di'
import SearchByEnvironmentDocumentsQuery from '@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQuery'
import MoveDocumentCommand from '@context/documents/application/move/moveDocumentCommand'
import FindEnvironmentQuery from '@context/environments/application/find/findEnvironmentQuery'
import PushDocumentCommand from '@context/documents/application/push/pushDocumentCommand'
import DeployDeploymentConfigsCommand from '@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommand'
import DeployDocumentCommand from '@context/documents/application/deploy/deployDocumentCommand'
import RestoreDocumentCommand from '@context/documents/application/restore/restoreDocumentCommand'
import CreateDeploymentConfigsCommand from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommand'
import UpdateDeploymentConfigsCommand from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommand'
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery'
import DeployEnvironmentCommand from '@context/environments/application/deploy/deployEnvironmentCommand'
import UndoPushDocumentCommand from '@context/documents/application/undoPush/undoPushDocumentCommand'

import FindDocumentQueryHandler from '@context/documents/application/find/findDocumentQueryHandler'
import { CustomRequest } from '@src/middleware/auths'
import SearchDocumentsQueryHandler from '@context/documents/application/search/searchDocumentsQueryHandler'
import SearchByEnvironmentDocumentsQueryHandler from '@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQueryHandler'
import CreateDocumentCommandHandler from '@context/documents/application/create/createDocumentCommandHandler'
import UpdateDocumentCommandHandler from '@context/documents/application/update/updateDocumentCommandHandler'
import FindEnvironmentQueryHandler from '@context/environments/application/find/findEnvironmentQueryHandler'
import MoveDocumentCommandHandler from '@context/documents/application/move/moveDocumentCommandHandler'
import RemoveDocumentCommandHandler from '@context/documents/application/delete/removeDocumentCommandHandler'
import RestoreDocumentCommandHandler from '@context/documents/application/restore/restoreDocumentCommandHandler'

const CONTENT_TYPE = 'content-type';
const APPLICATION_JSON = 'application/json';

export async function searchDocuments(req: Request, res: Response) {
    console.log('Request for searchDocuments Triggered');

    const handler = dependencies.get(HANDLERS).query.get(SearchDocumentsQuery) as
        SearchDocumentsQueryHandler;

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    const result = await handler.handle(
        new SearchDocumentsQuery({
            ...req.query,
            page_size: req.query.page_size ? parseInt(req.query.page_size as string) : undefined,
            page: req.query.page ? parseInt(req.query.page as string) : undefined
        },
        {
            environmentIds: environmentIds
        })
    );

    res.header(CONTENT_TYPE, APPLICATION_JSON);
    res.status(200).send({
        body:{ 
            result: result.documents,
            count: result.documentsCounter
        }
    });
}

export async function searchByEnvironmentDocuments(req: Request, res: Response) {
    console.log('Request for searchByEnvironmentDocuments Triggered');

    const { environmentId }  = req.query;

    const handler = dependencies.get(HANDLERS).query.get(SearchByEnvironmentDocumentsQuery) as 
        SearchByEnvironmentDocumentsQueryHandler;

    console.log('Id to find ByEnvironment', environmentId);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    const result = await handler.handle(
        new SearchByEnvironmentDocumentsQuery({
            environment: environmentId?.toString() ?? ""
        },
        {
            environmentIds: environmentIds
        })
    );

    res.header(CONTENT_TYPE, APPLICATION_JSON)
    res.status(200).send({
        body: result.documents
    });
}

export async function findDocument(req: Request, res: Response, next: NextFunction) {
    console.log('Request for findDocument Triggered');
    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).query.get(FindDocumentQuery) as 
        FindDocumentQueryHandler;

    console.log('Id to find', id);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try {
        const response = await handler.handle(
            new FindDocumentQuery({
                id: id,
            },
            {
                environmentIds: environmentIds
            })
        );

        res.header(CONTENT_TYPE, APPLICATION_JSON)
        res.status(200).send({
            body: response.primitives
        });
    } 
    catch (e) {
        next(e);
    }
}

export async function createDocument(req: Request, res: Response, next: NextFunction) {
    console.log('Request for createDocument Triggered');
    
    const handler = dependencies.get(HANDLERS).command.get(CreateDocumentCommand) as 
        CreateDocumentCommandHandler;

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;
        
    try {
        await handler.handle(new CreateDocumentCommand(
            req.body,
            {
                environmentIds: environmentIds
            }));

        res.status(201).send();
    } 
    catch (e) {
        next(e);
    }  
}

export async function updateDocument(req: Request, res: Response, next: NextFunction) {
    console.log('Request for updateDocument Triggered');

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).command.get(UpdateDocumentCommand) as 
        UpdateDocumentCommandHandler;

    console.log('Id to update', id);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try {
        await handler.handle(
            new UpdateDocumentCommand({
                id: id,
                ...req.body
            },
            {
                environmentIds: environmentIds
            })
        );

        res.status(204).send();
    } 
    catch (e) {
        next(e);
    }
}

export async function moveDocument(req: Request, res: Response, next: NextFunction) {
    console.log('Request for moveDocument Triggered');

    const { documentId, newEnvironmentId } = req.params;

    const queryBus = dependencies.get(BUSES).query;
    
    const finder = dependencies.get(HANDLERS).query.get(FindEnvironmentQuery) as 
        FindEnvironmentQueryHandler;
    queryBus.addQueryHandlers([ finder ]);

    const handler = dependencies.get(HANDLERS).command.get(MoveDocumentCommand) as 
        MoveDocumentCommandHandler;

    console.log('Id to move', documentId);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try {
        await handler.handle(
            new MoveDocumentCommand({
                documentId,
                newEnvironmentId,
                ...req.body
            },
            {
                environmentIds: environmentIds
            })
        );

        res.status(204).send();
    } 
    catch (e) {
        next(e);
    }
}

export async function deleteDocument(req: Request, res: Response, next: NextFunction) {
    console.log('Request for deleteDocument Triggered');
    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).command.get(RemoveDocumentCommand)
        RemoveDocumentCommandHandler;

    console.log('Id to delete', id);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try {
        await handler.handle(
            new RemoveDocumentCommand({
                id: id
            },
            {
                environmentIds: environmentIds
            })
        );

        res.status(204).send()
    } 
    catch (e) {
        next(e);
    }
}

export async function pushDocument(req: Request, res: Response, next: NextFunction) {
    console.log("Request for pushDocument triggered");

    const { id } = req.params;

    const queryBus = dependencies.get(BUSES).query;
    const commandBus = dependencies.get(BUSES).command;

    const deploymentConfigsByEnvironmentSearcher = dependencies.get("handlers").query.get(SearchByEnvironmentIsDeployedDeploymentConfigsQuery);
    queryBus.addQueryHandlers([deploymentConfigsByEnvironmentSearcher]);

    const deploymentcConfigsCreator = dependencies.get("handlers").command.get(CreateDeploymentConfigsCommand);
    commandBus.addCommandHandlers([deploymentcConfigsCreator]);

    const deploymentConfigsUpdater = dependencies.get("handlers").command.get(UpdateDeploymentConfigsCommand);
    commandBus.addCommandHandlers([deploymentConfigsUpdater]);

    const command = dependencies.get("handlers").command.get(PushDocumentCommand);

    console.log("Id to push: ", id);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{
        await command.handle(new PushDocumentCommand({
            id: id
        },
        {
            environmentIds: environmentIds
        })
    );

        res.status(204).send();
    }
    catch(e){
        next(e);
    }
}

export async function undoPushDocument(req: Request, res: Response, next: NextFunction) {
    console.log("Request for undoPushDocument triggered");

    const { id } = req.params;

    const queryBus = dependencies.get(BUSES).query;
    const commandBus = dependencies.get(BUSES).command;

    const deploymentConfigsByEnvironmentSearcher = dependencies.get("handlers").query.get(SearchByEnvironmentIsDeployedDeploymentConfigsQuery);
    queryBus.addQueryHandlers([deploymentConfigsByEnvironmentSearcher]);

    const deploymentConfigsUpdater = dependencies.get("handlers").command.get(UpdateDeploymentConfigsCommand);
    commandBus.addCommandHandlers([deploymentConfigsUpdater]);

    const command = dependencies.get("handlers").command.get(UndoPushDocumentCommand);

    console.log("Id to undoPush: ", id);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{
        await command.handle(new UndoPushDocumentCommand({
            id: id
        },
        { 
            environmentIds: environmentIds
        })
    );

        res.status(204).send();
    }
    catch(e){
        next(e);
    }
}

export async function deployDocuments(req: Request, res: Response, next: NextFunction) {
    console.log("Request for documents triggered");

    const { environmentId } = req.params;

    const queryBus = dependencies.get(BUSES).query;
    const commandBus = dependencies.get(BUSES).command;

    /* Environment & DeploymentConfigs finders */
    const deploymentConfigsByEnvironmentFinder = dependencies.get("handlers").query.get(SearchByEnvironmentIsDeployedDeploymentConfigsQuery);
    queryBus.addQueryHandlers([deploymentConfigsByEnvironmentFinder]);

    const environmentFinder = dependencies.get("handlers").query.get(FindEnvironmentQuery);
    queryBus.addQueryHandlers([environmentFinder]);

    /* Deploy deploymentConfigs & update environment (also update docs) */
    const environmentDeployer = dependencies.get("handlers").command.get(DeployEnvironmentCommand);
    commandBus.addCommandHandlers([environmentDeployer])

    const deployDeploymentConfigs = dependencies.get("handlers").command.get(DeployDeploymentConfigsCommand);
    commandBus.addCommandHandlers([deployDeploymentConfigs]);

    const command = dependencies.get("handlers").command.get(DeployDocumentCommand);

    console.log("Id of the environment to deploy: ", environmentId);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{
        await command.handle(new DeployDocumentCommand({
            environmentId: environmentId
        },
        {
            environmentIds: environmentIds
        }));

        res.status(204).send();
    }
    catch(e){
        next(e);
    }
}

export async function restoreDocument(req: Request, res: Response, next: NextFunction) {
    console.log('Request for restoreDocument Triggered')

    const { id, version } = req.params

    const handler = dependencies.get(HANDLERS).command.get(RestoreDocumentCommand) as 
        RestoreDocumentCommandHandler;

    console.log('Id to restore ', id)

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try {
        await handler.handle(
            new RestoreDocumentCommand({
                id: id,
                version: version
            },
            {
                environmentIds: environmentIds
            })
        );

        res.status(204).send()
    } 
    catch (e) {
        next(e);
    }
}

/*
export async function checkWritePermission(req: Request, res: Response, next: NextFunction) {
    const { environment } = req.body;

    if(!environment.id)
        res.status(401).send("Error. Environment not found");
    
    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    if(environment in environmentIds) {
        next();
    }
    else res.status(401).send("403 Forbiden");
}
*/
