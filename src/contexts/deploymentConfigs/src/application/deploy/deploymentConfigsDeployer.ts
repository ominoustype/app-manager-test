import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DeploymentConfigsFinder from "@src/domain/deploymentConfigsFinder";
import DeployDeploymentConfigsCommand from "./deployDeploymentConfigsCommand";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { DocumentPrimitives } from "@src/domain/documents/document";
import DeploymentConfigsNotFoundError from "@src/domain/errors/deploymentConfigsNotFoundError";
import DeploymentConfigsMissingParameterError from "@src/domain/errors/deploymentConfigsMissingParameterError";
import DeploymentConfigsForbiddenAccessError from "@src/domain/errors/deploymentConfigsForbiddenAccessError";
import logger from "@context/shared/infrastructure/logger";

export default class DeploymentConfigsDeployer {
    readonly finder: DeploymentConfigsFinder;

    readonly eventBus: EventBus;

    readonly repository: DeploymentConfigsRepository;

    constructor(repository: DeploymentConfigsRepository, eventBus: EventBus) {
        this.eventBus = eventBus;
        this.repository = repository;
        this.finder = new DeploymentConfigsFinder(repository);
    }

    async run(command: DeployDeploymentConfigsCommand): Promise<void> {
        const { data, permissions } = command;

        logger.info("Deploying deploymentConfigs with ", { data });

        if(!data.environmentId || !data.username || !data.password || !data.path) {
            throw new DeploymentConfigsMissingParameterError();
        }

        /* Get the deploymentConfigs linked to the given environmentId with attribute 'isDeployed = false' */
        const deploymentsConfigs = await this.repository.searchByEnvironmentIsDeployed({ environmentId: data.environmentId, isDeployed: false });
        if(!deploymentsConfigs || deploymentsConfigs.toPrimitives().length != 1 )
            throw new DeploymentConfigsNotFoundError(data.environmentId);

        const deploymentConfigs = deploymentsConfigs.find((() => true));

        if(!permissions.environmentIds.includes(deploymentConfigs!.environment.id.value)) {
            throw new DeploymentConfigsForbiddenAccessError(data.environmentId);
        }

        /* Deploy all documents to Azure Blob Storage */
        await this.deployDocuments(
            data.username, 
            data.password, 
            data.path, 
            deploymentConfigs!.toPrimitives().documents
        );

        /* Update deploymentConfigs */
        const newDeploymentConfigs = deploymentConfigs!.deploy(data.path);

        await this.repository.deploy(newDeploymentConfigs);
        await this.eventBus.publish(newDeploymentConfigs.pullDomainEvents());
    }

    async deployDocuments(username:string, password: string, path: string, documents: Array<DocumentPrimitives>) {

        const accountName = username;
        const accountKey = password;
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
  

        const containerName = path; // Use path attribute as container-name
        const containerClient = blobServiceClient.getContainerClient(containerName);

        await Promise.all(documents.map((document) => {

            const data = document.properties[0].value;
            const length = Buffer.byteLength(data);
            const name = document.name+'.json';

            containerClient.uploadBlockBlob(name, data, length, {  //1st arg is filename
                blobHTTPHeaders: { blobContentType: "application/json" }
            });
        }));
    }
}
    //accountName = "reacsaatmoust"; 
    //accountKey = "PfGszkpFFbPOToTsxmR1ZNCHOimpCc4OV+ZIRnkGFzYgAkuMDzSd0PeWCUWQCdSHxFSDKLlk906EwsswsIxYzg=="
    //containerName = "epamclient/appconfig";
