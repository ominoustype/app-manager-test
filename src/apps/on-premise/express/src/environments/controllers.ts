import { NextFunction, Request, Response } from "express";
import { BUSES, dependencies, HANDLERS } from './application.di'
import CreateEnvironmentCommand from "@context/environments/application/create/createEnvironmentCommand";
import UpdateEnvironmentCommand from "@context/environments/application/update/updateEnvironmentCommand";
import RemoveEnvironmentCommand from "@context/environments/application/delete/removeEnvironmentCommand";
import FindEnvironmentQuery from "@context/environments/application/find/findEnvironmentQuery";
import SearchEnvironmentsQuery from "@context/environments/application/search/searchEnvironmentsQuery";
import RemoveDeploymentConfigsCommandHandler from "@context/deploymentConfigs/application/delete/removeDeploymentConfigsCommandHandler";
import CreateEnvironmentCommandHandler from "@context/environments/application/create/createEnvironmentCommandHandler";
import FindEnvironmentQueryHandler from "@context/environments/application/find/findEnvironmentQueryHandler";
import SearchEnvironmentsQueryHandler from "@context/environments/application/search/searchEnvironmentsQueryHandler";
import SearchByEnvironmentDocumentsQuery from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQuery";
import UpdateDocumentCommand from "@context/documents/application/update/updateDocumentCommand";
import { CustomRequest } from "@src/middleware/auths";
import FindUserQuery from "@context/users/application/find/findUserQuery";
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import FindByCustomerAndNameRoleQuery from "@context/roles/application/findByCustomerAndName/findByCustomerAndNameRoleQuery";
import UpdateRoleCommand from "@context/roles/application/update/updateRoleCommand";
import SearchByEnvironmentDocumentsQueryHandler from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQueryHandler";
import UpdateDocumentCommandHandler from "@context/documents/application/update/updateDocumentCommandHandler";
import UpdateEnvironmentCommandHandler from "@context/environments/application/update/updateEnvironmentCommandHandler";
import FindUserQueryHandler from "@context/users/application/find/findUserQueryHandler";
import FindRoleQueryHandler from "@context/roles/application/find/findRoleQueryHandler";
import FindByCustomerAndNameRoleQueryHandler from "@context/roles/application/findByCustomerAndName/findByCustomerAndNameRoleQueryHandler";
import UpdateRoleCommandHandler from "@context/roles/application/update/updateRoleCommandHandler";
import LogoutUserCommand from "@context/users/application/logout/logoutUserCommand";
import LogOutUserCommandHandler from "@context/users/application/logout/logoutUserCommandHandler";
import logger from "@context/shared/infrastructure/logger";

const CONTENT_TYPE = 'content-type';
const APPLICATION_JSON = 'application/json';

export async function searchEnvironments(req: Request, res: Response) {
    logger.info("Request for searchEnvironments triggered");

    const handler = dependencies.get(HANDLERS).query.get(SearchEnvironmentsQuery) as 
        SearchEnvironmentsQueryHandler;

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    const result = await handler.handle(
        new SearchEnvironmentsQuery({
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
        body: ({ result: result.environments })
    });
}

export async function findEnvironment(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for findEnvironment triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).query.get(FindEnvironmentQuery) as
        FindEnvironmentQueryHandler;

    logger.info("Id to find: ", { id });

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;
    
    try{
        const response = await handler.handle(new FindEnvironmentQuery({
                id: id 
            }, 
            { 
                environmentIds: environmentIds 
            })
        );

        res.header(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: (response.primitives)
        });
    }
    catch(e){
        next(e);
    }
}

export async function createEnvironment(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for createEnvironment triggered");

    const queryBus = dependencies.get(BUSES).query;
    const commandBus = dependencies.get(BUSES).command;

    const handler = dependencies.get(HANDLERS).command.get(CreateEnvironmentCommand) as 
        CreateEnvironmentCommandHandler;

    /* Find user, find role, find by customer & name role, update role */
    const userFinder = dependencies.get(HANDLERS).query.get(FindUserQuery) as 
        FindUserQueryHandler;
    queryBus.addQueryHandlers([ userFinder ]);

    const roleFinder = dependencies.get(HANDLERS).query.get(FindRoleQuery) as
        FindRoleQueryHandler;
    queryBus.addQueryHandlers([ roleFinder ]);

    const byCustomerAndNameRoleFinder = dependencies.get(HANDLERS).query.get(FindByCustomerAndNameRoleQuery) as
        FindByCustomerAndNameRoleQueryHandler;
    queryBus.addQueryHandlers([ byCustomerAndNameRoleFinder ]);

    const roleUpdater  = dependencies.get(HANDLERS).command.get(UpdateRoleCommand) as
        UpdateRoleCommandHandler;
    commandBus.addCommandHandlers([ roleUpdater ]);

    const userLogout  = dependencies.get(HANDLERS).command.get(LogoutUserCommand) as
        LogOutUserCommandHandler;
    commandBus.addCommandHandlers([ userLogout ]);

    const username = (req as CustomRequest).user.username;
    const accessToken = (req as CustomRequest).user.accessToken;

    try{
        await handler.handle(new CreateEnvironmentCommand(req.body, { 
            username: username,
            accessToken: accessToken
        }));
        res.status(201).send();
    }
    catch(e){
        next(e);
    }
}

export async function updateEnvironment(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for updateEnvironment triggered");

    const { id } = req.params;

    const queryBus = dependencies.get(BUSES).query;
    const commandBus = dependencies.get(BUSES).command;

    const finder = dependencies.get(HANDLERS).query.get(SearchByEnvironmentDocumentsQuery) as
        SearchByEnvironmentDocumentsQueryHandler;
    queryBus.addQueryHandlers([finder]);

    const updater = dependencies.get(HANDLERS).command.get(UpdateDocumentCommand) as
        UpdateDocumentCommandHandler;
    commandBus.addCommandHandlers([updater]);

    const handler = dependencies.get(HANDLERS).command.get(UpdateEnvironmentCommand) as
        UpdateEnvironmentCommandHandler;

    logger.info("Id to update: ", { id });

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{
        await handler.handle(new UpdateEnvironmentCommand({ 
                id: id, 
                ...req.body
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

export async function deleteEnvironment(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for deleteEnvironment triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).command.get(RemoveEnvironmentCommand) as 
        RemoveDeploymentConfigsCommandHandler;

    logger.info("Id to delete: ", { id });

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{
        await handler.handle(new RemoveEnvironmentCommand({
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