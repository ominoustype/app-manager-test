import { CommandBus } from "@context/shared/domain/commandBus/commandBus";
import { EventBus } from "@context/shared/domain/eventBus/eventBus";
import { QueryBus } from "@context/shared/domain/queryBus/queryBus";
import DocumentFinder from "@src/domain/documentFinder";
import DocumentRepository from "@src/domain/documentRepository";
import DeployDocumentCommand from "./deployDocumentCommand";
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsQuery";
import SearchByEnvironmentIsDeployedDeploymentConfigsResponse from "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsResponse";
import DeployDeploymentConfigsCommand from "@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommand";
import FindEnvironmentQuery from "@context/environments/application/find/findEnvironmentQuery";
import EnvironmentResponse from "@context/environments/application/find/findEnvironmentResponse";
import DeployEnvironmentCommand from "@context/environments/application/deploy/deployEnvironmentCommand";

export default class DocumentDeployer {
    readonly finder: DocumentFinder;

    readonly eventBus: EventBus;

    readonly repository: DocumentRepository;

    readonly queryBus: QueryBus;

    readonly commandBus: CommandBus;

    constructor(repository: DocumentRepository, eventBus: EventBus, queryBus: QueryBus, commandBus: CommandBus) {
        this.eventBus = eventBus;
        this.repository = repository;
        this.finder = new DocumentFinder(repository);
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }

    async run(command: DeployDocumentCommand): Promise<void> {
        const { data, permissions } = command;

        if(!data.environmentId)
            return;

        /* Get the deploymentConfigs linked to the given environmentId with attribute 'isDeployed = false' */
        const deploymentConfigs = await this.queryBus.ask(
            new SearchByEnvironmentIsDeployedDeploymentConfigsQuery({ 
                environmentId: data.environmentId, 
                isDeployed: false 
            })
        ) as unknown as SearchByEnvironmentIsDeployedDeploymentConfigsResponse;

        if(deploymentConfigs === null)
            return;

        const deploymentConfigsPrimitives = deploymentConfigs.primitives[0];

//1     /* For each document to be deployed -> change the status to DEPLOYED */
        for await(const doc of deploymentConfigsPrimitives.documents) {
            const id = doc.id;

            const document = await this.finder.find(id, permissions.environmentIds);

            if(!document) {
                return
            }

            const newDocument = document.deploy();

            await this.repository.update(newDocument);

            await this.eventBus.publish(newDocument.pullDomainEvents());
        }

        /* Get the environment */
        const environment = await this.queryBus.ask(
            new FindEnvironmentQuery({ 
                id: data.environmentId 
            },
            {
                environmentIds: permissions.environmentIds
            })
        ) as EnvironmentResponse;

        if(!environment){
            return
        };

        const environmentPrimitives = environment.primitives;

//2     /* Update the environment adding the reference of the deploymentConfigs about to be deployed */
        await this.commandBus.dispatch(
            new DeployEnvironmentCommand({
                primitives: environmentPrimitives,
                deploymentConfigsId: deploymentConfigsPrimitives.id
            })
        );

//3     /* Deploy the deploymentConfigs */
        await this.commandBus.dispatch(
            new DeployDeploymentConfigsCommand({ 
                environmentId: data.environmentId, 
                username: environmentPrimitives.credentials.username,
                password: environmentPrimitives.credentials.password,
                path: environmentPrimitives.path
            })
        );
    }
}