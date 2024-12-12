import { Express } from 'express'

import { searchDeploymentConfigs, findDeploymentConfigs, createDeploymentConfigs,
    updateDeploymentConfigs, deleteDeploymentConfigs, deployDeploymentConfigs,
findByEnvironmentIsDeployedDeploymentConfigs } from './controllers';

const BASE_URL = "/deploymentConfigs";

export default function loadDeploymentConfigs(app: Express) {
    app.get(BASE_URL, searchDeploymentConfigs);
    app.get(`${BASE_URL}/:id`, findDeploymentConfigs);
    app.get(`${BASE_URL}/byEnvironment/:environmentId&:isDeployed`, findByEnvironmentIsDeployedDeploymentConfigs);
    app.post(BASE_URL, createDeploymentConfigs);
    app.put(`${BASE_URL}/:id`, updateDeploymentConfigs);
    app.delete(`${BASE_URL}/:id`, deleteDeploymentConfigs);
    app.put(`${BASE_URL}/:id/deploy`, deployDeploymentConfigs);
}