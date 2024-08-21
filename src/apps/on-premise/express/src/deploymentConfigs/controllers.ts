import { Request, Response } from 'express'
import { dependencies } from './application.di'
import { HANDLERS } from './application.di';

import SearchDeploymentConfigsQuery from '@context/deploymentConfigs/application/search/searchDeploymentsConfigsQuery'
import FindDeploymentConfigsQuery from '@context/deploymentConfigs/application/find/findDeploymentConfigsQuery';
import CreateDeploymentConfigsCommand from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommand';
import RemoveDeploymentConfigsCommand from '@context/deploymentConfigs/application/delete/removeDeploymentConfigsCommand';
import UpdateDeploymentConfigsCommand from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommand';

import FindDeploymentConfigsQueryHandler from '@context/deploymentConfigs/application/find/findDeploymentConfigsQueryHandler';
import UpdateDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommandHandler';
import RemoveDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/delete/removeDeploymentConfigsCommandHandler';
import SearchDeploymentsConfigsQueryHandler from '@context/deploymentConfigs/application/search/searchDeploymentsConfigsQueryHandler';
import CreateDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommandHandler';


const CONTENT_TYPE = "content-type";
const APPLICATION_JSON = "application/json";

export async function searchDeploymentConfigs(req: Request, res: Response) {
    console.log('Request for searchDeploymentConfigs triggered');

    const handler = dependencies.get(HANDLERS).query.get(
        SearchDeploymentConfigsQuery) as SearchDeploymentsConfigsQueryHandler;

    const result = await handler.handle(
        new SearchDeploymentConfigsQuery(
            { ...req.query })
        );

    res.header(CONTENT_TYPE, APPLICATION_JSON);
    res.status(200).send({
        body: result.deploymentsConfigs 
    });
}

export async function findDeploymentConfigs(req: Request, res: Response) {
    console.log("Request for findDeploymentConfigs triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).query.get(
        FindDeploymentConfigsQuery) as FindDeploymentConfigsQueryHandler;

    console.log("Id to find: ", id);

    try{    
        const response = await handler.handle(new FindDeploymentConfigsQuery({id}));
        res.header(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: JSON.stringify(response.primitives)
        });
    }
    catch(e){
        res.status(404).send({ error: e });
    }
}

export async function createDeploymentConfigs(req: Request, res: Response) {
    console.log("Request for createDeploymentConfigs triggered");

    const command = dependencies.get(HANDLERS).command.get(
        CreateDeploymentConfigsCommand) as CreateDeploymentConfigsCommandHandler;

    try{
        await command.handle(new CreateDeploymentConfigsCommand(req.body));
        res.status(201).send();
    }
    catch(e){
        return e;
    }
}

export async function updateDeploymentConfigs(req: Request, res: Response) {
    console.log("Request for updateDeploymentConfigs triggered");

    const { id } = req.params;

    const command = dependencies.get(HANDLERS).command.get(
        UpdateDeploymentConfigsCommand) as UpdateDeploymentConfigsCommandHandler;

    console.log("Id to update: ", id);

    try{
        await command.handle(new UpdateDeploymentConfigsCommand({
            id: id,
            ...req.body
        }));

        res.status(204).send();
    }
    catch(e){
        return e;
    }
}

export async function deleteDeploymentConfigs(req: Request, res: Response) {
    console.log("Request for deleteDeploymentConfigs triggered");

    const { id } = req.params;

    const command = dependencies.get(HANDLERS).command.get(
        RemoveDeploymentConfigsCommand) as RemoveDeploymentConfigsCommandHandler ;

    console.log('Id to delete', id);

    try{
        await command.handle(new RemoveDeploymentConfigsCommand({id: id}));
        res.status(204).send();
    }
    catch(e){
        return e;
    }
}
