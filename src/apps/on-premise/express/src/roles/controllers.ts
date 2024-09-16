import { Request, Response } from "express";
import { dependencies, HANDLERS } from './application.di'
import FindRoleQuery from "@context/role/application/find/findRoleQuery";
import FindRoleQueryHandler from "@context/role/application/find/findRoleQueryHandler";
import CreateRoleCommand from "@context/role/application/create/createRoleCommand";
import CreateRoleCommandHandler from "@context/role/application/create/createRoleCommandHandler";
import UpdateRoleCommand from "@context/role/application/update/updateRoleCommand";
import UpdateRoleCommandHandler from "@context/role/application/update/updateRoleCommandHandler";
import RemoveRoleCommand from "@context/role/application/delete/removeRoleCommand";
import RemoveRoleCommandHandler from "@context/role/application/delete/removeRoleCommandHandler";
import SearchRolesQueryHandler from "@context/role/application/search/searchRolesQueryHandler";
import SearchRolesQuery from "@context/role/application/search/searchRolesQuery";

const CONTENT_TYPE = 'content-type';
const APPLICATION_JSON = 'application/json';

export async function searchRoles(req: Request, res: Response) {
    console.log("Request for searchRoles triggered");

    const handler = dependencies.get(HANDLERS).query.get(SearchRolesQuery) as 
        SearchRolesQueryHandler;

    const result = await handler.handle(
        new SearchRolesQuery({
            ...req.query
    }));

    res.setHeader(CONTENT_TYPE, APPLICATION_JSON);
    res.status(200).send({
        body: JSON.stringify({ result: result.primitives })
    });
}

export async function findRole(req: Request, res: Response) {
    console.log("Request for findRole triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).query.get(FindRoleQuery) as
        FindRoleQueryHandler;

    console.log("Id to find: "+id);

    try{
        const response = await handler.handle(new FindRoleQuery({id: id}));

        res.setHeader(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: JSON.stringify(response.primitives)
        });
    }
    catch(e){
        res.status(404).send({ error: e });
    }
}

export async function createRole(req: Request, res: Response) {
    console.log("Request for createRole triggered");

    const handler = dependencies.get(HANDLERS).command.get(CreateRoleCommand) as 
        CreateRoleCommandHandler;

    try{
        await handler.handle(new CreateRoleCommand(req.body));
        res.status(201).send();
    }
    catch(e){
        return e;
    }
}

export async function updateRole(req: Request, res: Response) {
    console.log("Request for updateRole triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).command.get(UpdateRoleCommand) as 
        UpdateRoleCommandHandler;

    console.log("Id to update: "+id);

    try{
        await handler.handle(new UpdateRoleCommand({ 
            id: id,
            ...req.body 
        }));
        res.status(204).send();
    }
    catch(e){
        return e;
    }
}

export async function deleteRole(req: Request, res: Response) {
    console.log("Request for deleteRole triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).command.get(RemoveRoleCommand) as
        RemoveRoleCommandHandler;

    try{
        await handler.handle(new RemoveRoleCommand({ id }));
        res.status(404).send();
    }
    catch(e){
        return e;
    }
}