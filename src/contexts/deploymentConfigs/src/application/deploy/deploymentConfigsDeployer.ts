import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import DeploymentConfigsFinder from "@src/domain/deploymentConfigsFinder";
import DeployDeploymentConfigsCommand from "./deployDeploymentConfigsCommand";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { DocumentPrimitives } from "@src/domain/documents/document";
import DeploymentConfigsNotFoundError from "@src/domain/errors/deploymentsConfigsNotFoundError";

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
        const { environmentId, username, password, path } = command.data,
            { environmentIds } = command.permissions;

        if(!environmentId)
            return;

        /* Get the deploymentConfigs linked to the given environmentId with attribute 'isDeployed = false' */
        const deploymentsConfigs = await this.repository.searchByEnvironmentIsDeployed({ environmentId: environmentId, isDeployed: false });
        if(!deploymentsConfigs || deploymentsConfigs.toPrimitives().length != 1 )
            throw new DeploymentConfigsNotFoundError(environmentId);

        const deploymentConfigs = deploymentsConfigs.find((() => true));

        if(!environmentIds.includes(deploymentConfigs!.environment.id.value)) {
            return;
        }

        /* Deploy all documents to Azure Blob Storage */
        await this.deployDocuments(username, password, path, deploymentConfigs!.toPrimitives().documents);

        const newDeploymentConfigs = deploymentConfigs!.deploy(path);

        await this.repository.deploy(newDeploymentConfigs);
        await this.eventBus.publish(newDeploymentConfigs.pullDomainEvents());
    }

    async deployDocuments(username:string, password: string, path: string, documents: Array<DocumentPrimitives>) {
        // Azure Blob Storage credentials
        const accountName = username;
        const accountKey = password;
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
   
        // Establish connection
        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
  
        // Retrieve container for data deployment
        const containerName = path; // Use path attribute as container-name
        const containerClient = blobServiceClient.getContainerClient(containerName);

        await Promise.all(documents.map((document) => {
            // Prepare data
            const data = document.properties[0].value;
            const length = Buffer.byteLength(data);
            const name = document.name+'.json';

            // Deploy data
            containerClient.uploadBlockBlob(name, data, length, {  //1st arg is filename
                blobHTTPHeaders: { blobContentType: "application/json" }
            });
        }));
    }
}
    //accountName = "reacsaatmoust"; 
    //accountKey = "PfGszkpFFbPOToTsxmR1ZNCHOimpCc4OV+ZIRnkGFzYgAkuMDzSd0PeWCUWQCdSHxFSDKLlk906EwsswsIxYzg=="
    //containerName = "epamclient/appconfig";
