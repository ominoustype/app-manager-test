import { NextFunction, Request, Response } from 'express'
import { dependencies } from './application.di'
import { HANDLERS } from './application.di';

import SearchDeploymentConfigsQuery from '@context/deploymentConfigs/application/search/searchDeploymentsConfigsQuery'
import FindDeploymentConfigsQuery from '@context/deploymentConfigs/application/find/findDeploymentConfigsQuery';
import CreateDeploymentConfigsCommand from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommand';
import RemoveDeploymentConfigsCommand from '@context/deploymentConfigs/application/delete/removeDeploymentConfigsCommand';
import UpdateDeploymentConfigsCommand from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommand';
import DeployDeploymentConfigsCommand from '@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommand';

import FindDeploymentConfigsQueryHandler from '@context/deploymentConfigs/application/find/findDeploymentConfigsQueryHandler';
import UpdateDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/update/updateDeploymentConfigsCommandHandler';
import RemoveDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/delete/removeDeploymentConfigsCommandHandler';
import SearchDeploymentsConfigsQueryHandler from '@context/deploymentConfigs/application/search/searchDeploymentsConfigsQueryHandler';
import CreateDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/create/createDeploymentConfigsCommandHandler';
import DeployDeploymentConfigsCommandHandler from '@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommandHandler';

import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery';
import SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler from '@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQueryHandler';
import { CustomRequest } from '@src/middleware/auths';

import logger from '@context/shared/infrastructure/logger';

const CONTENT_TYPE = "content-type";
const APPLICATION_JSON = "application/json";


export async function searchDeploymentConfigs(req: Request, res: Response) {
    logger.info('Request for searchDeploymentConfigs triggered');

    const handler = dependencies.get(HANDLERS).query.get(
        SearchDeploymentConfigsQuery) as SearchDeploymentsConfigsQueryHandler;
    
    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;
        
    const result = await handler.handle(
        new SearchDeploymentConfigsQuery({ 
                ...req.query 
            },{
                environmentIds: environmentIds
            })
        );

    res.header(CONTENT_TYPE, APPLICATION_JSON);
    res.status(200).send({
        body: result.deploymentsConfigs 
    });
}

export async function findDeploymentConfigs(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for findDeploymentConfigs triggered");

    const { id } = req.params;

    const handler = dependencies.get(HANDLERS).query.get(
        FindDeploymentConfigsQuery) as FindDeploymentConfigsQueryHandler;

    logger.info("Id to find: ", { id });

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{    
        const response = await handler.handle(new FindDeploymentConfigsQuery({
                id: id 
            },{
                environmentIds: environmentIds
            })
        );
        res.header(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: response.primitives
        });
    }
    catch(e){
        next(e);
    }
}

export async function findByEnvironmentIsDeployedDeploymentConfigs(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for findByEnvironmentIsDeployedDeploymentConfigs triggered");

    const { environmentId, isDeployed } = req.params;

    const handler = dependencies.get(HANDLERS).query.get(
        SearchByEnvironmentIsDeployedDeploymentConfigsQuery) as SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler;

    logger.info("ByEnvironmentId to find: " +environmentId+" and it is deployed "+isDeployed);

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{    
        const response = await handler.handle(new SearchByEnvironmentIsDeployedDeploymentConfigsQuery({
                environmentId: environmentId,
                isDeployed: isDeployed === 'true'? true : false
            },{
                environmentIds: environmentIds
            })
        );
        res.header(CONTENT_TYPE, APPLICATION_JSON);
        res.status(200).send({
            body: response.primitives
        });
    }
    catch(e){
        next(e);
    }
}

export async function createDeploymentConfigs(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for createDeploymentConfigs triggered");

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    const command = dependencies.get(HANDLERS).command.get(
        CreateDeploymentConfigsCommand) as CreateDeploymentConfigsCommandHandler;

    try{
        await command.handle(new CreateDeploymentConfigsCommand(req.body,{
                environmentIds: environmentIds
            }
        ));
        res.status(201).send();
    }
    catch(e){
        next(e);
    }
}

export async function updateDeploymentConfigs(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for updateDeploymentConfigs triggered");

    const { id } = req.params;

    const command = dependencies.get(HANDLERS).command.get(
        UpdateDeploymentConfigsCommand) as UpdateDeploymentConfigsCommandHandler;

    logger.info("Id to update: ", { id });

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{
        await command.handle(new UpdateDeploymentConfigsCommand({
                id: id,
                ...req.body
            },{
                environmentIds: environmentIds
            })
        );

        res.status(204).send();
    }
    catch(e){
        next(e);
    }
}

export async function deleteDeploymentConfigs(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for deleteDeploymentConfigs triggered");

    const { id } = req.params;

    const command = dependencies.get(HANDLERS).command.get(
        RemoveDeploymentConfigsCommand) as RemoveDeploymentConfigsCommandHandler ;

    logger.info('Id to delete', { id });

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{
        await command.handle(new RemoveDeploymentConfigsCommand({
                id: id
            },{
                environmentIds: environmentIds
            })
        );
        res.status(204).send();
    }
    catch(e){
        next(e);
    }
}

export async function deployDeploymentConfigs(req: Request, res: Response, next: NextFunction) {
    logger.info("Request for deployDeploymentConfigs triggered");

    const { id } = req.params;

    const command = dependencies.get(HANDLERS).command.get(
        DeployDeploymentConfigsCommand) as DeployDeploymentConfigsCommandHandler;

    logger.info("Id to deploy: ", { id });

    const environmentIds = (req as CustomRequest).user.permissions.environmentIds;

    try{
        await command.handle(new DeployDeploymentConfigsCommand({
                id: id,
                ...req.body
            },{
                environmentIds: environmentIds
            })
        );

        res.status(204).send();
    }
    catch(e){
        next(e);
    }
}