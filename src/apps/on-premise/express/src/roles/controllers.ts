import { NextFunction, Request, Response } from "express";
import { dependencies, HANDLERS } from './application.di'
import FindRoleQuery from "@context/roles/application/find/findRoleQuery";
import FindRoleQueryHandler from "@context/roles/application/find/findRoleQueryHandler";
import UpdateRoleCommand from "@context/roles/application/update/updateRoleCommand";
import UpdateRoleCommandHandler from "@context/roles/application/update/updateRoleCommandHandler";
import RemoveRoleCommand from "@context/roles/application/delete/removeRoleCommand";
import RemoveRoleCommandHandler from "@context/roles/application/delete/removeRoleCommandHandler";
import SearchRolesQueryHandler from "@context/roles/application/search/searchRolesQueryHandler";
import SearchRolesQuery from "@context/roles/application/search/searchRolesQuery";
import CreateRoleQueryHandler from "@context/roles/application/create/createRoleQueryHandler";
import CreateRoleQuery from "@context/roles/application/create/createRoleQuery";
import logger from "@context/shared/infrastructure/logger";

const CONTENT_TYPE = 'content-type';
const APPLICATION_JSON = 'application/json';

export async function searchRoles(req: Request, res: Response) {
    logger.info("Request for searchRoles triggered");

    const handler = dependencies.get(HANDLERS).query.get(SearchRolesQuery) as 
        SearchRolesQueryHandler;

    const result = await handler.handle(
        new SearchRolesQuery({
            ...req.query
    }));

    res.setHeader(CONTENT_TYPE, APPLICATION_JSON);
    res.status(200).send({
        body: { result: result.primitives }
    });
}

export async function findRole(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for findRole triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).query.get(FindRoleQuery) as
        FindRoleQueryHandler;

    logger.info("Id to find: ", { id });

    try{
        const response = await handler.handle(new FindRoleQuery({id: id}));

        res.setHeader(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: response.primitives
        });
    }
    catch(e){
        next(e);
    }
}

export async function createRole(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for createRole triggered");

    const handler = dependencies.get(HANDLERS).query.get(CreateRoleQuery) as 
        CreateRoleQueryHandler;

    try{
        const newRole = await handler.handle(new CreateRoleQuery(req.body));
        res.status(201).send({ result: newRole});
    }
    catch(e){
        next(e);
    }
}

export async function updateRole(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for updateRole triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).command.get(UpdateRoleCommand) as 
        UpdateRoleCommandHandler;

    logger.info("Id to update: ", { id });

    try{
        await handler.handle(new UpdateRoleCommand({ 
            id: id,
            ...req.body 
        }));
        res.status(204).send();
    }
    catch(e){
        next(e);
    }
}

export async function deleteRole(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for deleteRole triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).command.get(RemoveRoleCommand) as
        RemoveRoleCommandHandler;

    logger.info('Id to delete', { id });

    try{
        await handler.handle(new RemoveRoleCommand({ id }));
        res.status(404).send();
    }
    catch(e){
        next(e);
    }
}