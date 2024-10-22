import { Request, Response } from "express";
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
import UpdateEnvironmentCommandHandler from "@context/environments/application/update/updateEnvironmentCommandHandler";
import SearchByEnvironmentDocumentsQueryHandler from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQueryHandler";
import SearchByEnvironmentDocumentsQuery from "@context/documents/application/searchByEnvironment/searchByEnvironmentDocumentsQuery";
import UpdateDocumentCommand from "@context/documents/application/update/updateDocumentCommand";
import UpdateDocumentCommandHandler from "@context/documents/application/update/updateDocumentCommandHandler";

const CONTENT_TYPE = 'content-type';
const APPLICATION_JSON = 'application/json';

export async function searchEnvironments(req: Request, res: Response) {
    console.log("Request for searchEnvironments triggered");

    const handler = dependencies.get(HANDLERS).query.get(SearchEnvironmentsQuery) as 
        SearchEnvironmentsQueryHandler;

    const result = await handler.handle(
        new SearchEnvironmentsQuery({
            ...req.query
    }));

    res.header(CONTENT_TYPE, APPLICATION_JSON);
    res.status(200).send({
        body: JSON.stringify({ result: result.environments })
    });
}

export async function findEnvironment(req: Request, res: Response) {
    console.log("Request for findEnvironment triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).query.get(FindEnvironmentQuery) as
        FindEnvironmentQueryHandler;

    console.log("Id to find: "+id);

    try{
        const response = await handler.handle(new FindEnvironmentQuery({ id }));

        res.header(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: JSON.stringify(response.primitives)
        });
    }
    catch(e){
        res.status(404).send({ error: e });
    }
}

export async function createEnvironment(req: Request, res: Response) {
    console.log("Request for createEnvironment triggered");

    const handler = dependencies.get(HANDLERS).command.get(CreateEnvironmentCommand) as 
        CreateEnvironmentCommandHandler;

    try{
        await handler.handle(new CreateEnvironmentCommand(req.body));
        res.status(201).send();
    }
    catch(e){
        return e;
    }
}

export async function updateEnvironment(req: Request, res: Response) {
    console.log("Request for updateEnvironment triggered");

    const { id } = req.params;

    const queryBus = dependencies.get(BUSES).query;
    const commandBus = dependencies.get(BUSES).command;

    const finder = dependencies.get(HANDLERS).query.get(SearchByEnvironmentDocumentsQuery) as 
        SearchByEnvironmentDocumentsQueryHandler;
    queryBus.addQueryHandlers([finder]);

    const updater = dependencies.get(HANDLERS).command.get(UpdateDocumentCommand) as 
        UpdateDocumentCommandHandler;
    commandBus.addQueryHandlers([updater]);

    const handler = dependencies.get(HANDLERS).command.get(UpdateEnvironmentCommand) as 
        UpdateEnvironmentCommandHandler;

    console.log("Id to update: "+id);

    try{
        await handler.handle(new UpdateEnvironmentCommand({ 
            id: id, 
            ...req.body
        }));
        res.status(204).send();
    }
    catch(e){
        return e;
    }
}

export async function deleteEnvironment(req: Request, res: Response) {
    console.log("Request for deleteEnvironment triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).command.get(RemoveEnvironmentCommand) as 
        RemoveDeploymentConfigsCommandHandler;

    console.log("Id to delete: "+id);

    try{
        await handler.handle(new RemoveEnvironmentCommand({ id: id }));
        res.status(204).send();
    }
    catch(e){
        return e;
    }
}