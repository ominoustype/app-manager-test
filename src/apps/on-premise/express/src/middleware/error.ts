import EnvironmentAlreadyExistsError from '@context/environments/domain/errors/environmentAlreadyExistsError';
import EnvironmentNotFoundError from '@context/environments/domain/errors/environmentNotFoundError';
import logger from '@context/shared/infrastructure/logger';
import { Request, Response, NextFunction } from 'express'
import EnvironmentForbiddenAccessError from '@context/environments/domain/errors/environmentForbiddenAccessError';
import EnvironmentMissingParameterError from '@context/environments/domain/errors/environmentMissingParameterError';
import DocumentNotFoundError from '@context/documents/domain/errors/documentNotFoundError';
import DocumentAlreadyExistsError from '@context/documents/domain/errors/documentAlreadyExistsError';
import CustomerNotFoundError from '@context/customers/domain/errors/customerNotFound';
import RoleNotFoundError from '@context/roles/domain/errors/roleNotFoundError';
import RoleByCustomerAndNameFinder from '@context/roles/application/findByCustomerAndName/roleByCustomerAndNameFinder';
import RoleAlreadyExistsError from '@context/roles/domain/errors/roleAlreadyExistError';
import RoleMissingParameterError from '@context/roles/domain/errors/roleMissingParameterError';
import DeploymentConfigsNotFoundError from '@context/deploymentConfigs/domain/errors/deploymentConfigsNotFoundError';
import DeploymentsConfigsNotFoundError from '@context/deploymentConfigs/domain/errors/deploymentConfigsNotFoundError';
import DeploymentConfigsForbiddenAccessError from '@context/deploymentConfigs/domain/errors/deploymentConfigsForbiddenAccessError';
import DeploymentConfigsMissingParameterError from '@context/deploymentConfigs/domain/errors/deploymentConfigsMissingParameterError';
import DeploymentConfigsAlreadyExistsError from '@context/deploymentConfigs/domain/errors/deploymentConfigsAlreadyExistsError';
import UserNotFoundError from '@context/users/domain/errors/userNotFoundError';
import UserAlreadyExistsError from '@context/users/domain/errors/userAlreadyExistsError';
import UserMissingParameterError from '@context/users/domain/errors/userMissingParameterError';

export default function errorHandler<T extends Error>(error: T, _request: Request, response: Response, _next: NextFunction) {
    logger.error(error.message);

    if(error instanceof DocumentNotFoundError ||
                        DeploymentConfigsNotFoundError || DeploymentsConfigsNotFoundError ||
                        EnvironmentNotFoundError ||
                        UserNotFoundError ||
                        RoleNotFoundError || RoleByCustomerAndNameFinder ||
                        CustomerNotFoundError) {
        response.status(404).send({ message: "Entity not found" });
    }

    if(error instanceof DocumentAlreadyExistsError ||
                        DeploymentConfigsAlreadyExistsError ||
                        EnvironmentAlreadyExistsError ||
                        UserAlreadyExistsError ||
                        RoleAlreadyExistsError) {
        response.status(409).send({ message: "Entity already exists" });
    }

    if(error instanceof DeploymentConfigsForbiddenAccessError ||
                        EnvironmentForbiddenAccessError) {
        response.status(401).send({ message: "Forbidden access" });
    }

    if(error instanceof DeploymentConfigsMissingParameterError ||
                        EnvironmentMissingParameterError ||
                        UserMissingParameterError ||
                        RoleMissingParameterError) {
        response.status(400).send({ message: "Missing parameter" });
    }

    response.status(500).send({ message: "Something went wrong :(" });
}