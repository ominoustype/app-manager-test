import { Express } from 'express'

import { searchDeploymentConfigs, findDeploymentConfigs,
    deleteDeploymentConfigs,
    findByEnvironmentIsDeployedDeploymentConfigs } from './controllers';

import { auth } from '@src/middleware/auths';

const BASE_URL = "/deploymentConfigs";

export default function loadDeploymentConfigs(app: Express) {
    app.get(BASE_URL, auth, searchDeploymentConfigs);
    app.get(BASE_URL+"/:id", auth, findDeploymentConfigs);
    app.get(BASE_URL+"/byEnvironment/:environmentId&:isDeployed", findByEnvironmentIsDeployedDeploymentConfigs);
    //app.post(BASE_URL, createDeploymentConfigs);
    //app.put(`${BASE_URL}/:id`, updateDeploymentConfigs);
    app.delete(BASE_URL+"/:id", auth, deleteDeploymentConfigs);
    //app.put(`${BASE_URL}/:id/deploy`, deployDeploymentConfigs);
}