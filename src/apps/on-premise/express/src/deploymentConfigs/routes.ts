import { Express } from 'express'

import { searchDeploymentConfigs, findDeploymentConfigs, createDeploymentConfigs,
    updateDeploymentConfigs, deleteDeploymentConfigs } from './controllers';

export default function loadDeploymentConfigs(app: Express) {
    app.get('/deploymentConfigs', searchDeploymentConfigs);
    app.get('/deploymentConfigs/:id', findDeploymentConfigs);
    app.post('/deploymentConfigs', createDeploymentConfigs);
    app.put('/deploymentConfigs/:id', updateDeploymentConfigs);
    app.delete('/deploymentConfigs/:id', deleteDeploymentConfigs);
}