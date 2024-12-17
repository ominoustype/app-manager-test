import CommandBusMock from "@context/shared/__mocks__/commandBus.mock";
import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import QueryBusMock from "@context/shared/__mocks__/queryBus.mock";
import DocumentRepositoryMock from "@src/__mock__/documentRepository";
import DeployDocumentCommandHandler from "./deployDocumentCommandHandler";
import DocumentDeployer from "./documentDeployer";
import DeployDocumentCommandMother from "./deployDocumentCommand.mother";
import DeploymentConfigsMother from "@context/deploymentConfigs/domain/deploymentConfigs.mother";
import FindEnvironmentResponseMother from "@context/environments/application/find/findEnvironmentResponse.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import DeployEnvironmentCommand from "@context/environments/application/deploy/deployEnvironmentCommand";
import DeployDeploymentConfigsCommand from "@context/deploymentConfigs/application/deploy/deployDeploymentConfigsCommand";
import SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother from "@context/deploymentConfigs/application/searchByEnvironmentIsDeployed/searchByEnvironmentIsDeployedDeploymentConfigsResponse.mother";

describe('documentDeployer', () => {
    it('should dispatch a BasicUpdateEnvironmentCommand and a DeployDeploymentConfigsCommand', async () => {
        expect.hasAssertions();

        const repository = new DocumentRepositoryMock(),
            eventBus = new EventBusMock(),
            queryBus = new QueryBusMock(),
            commandBus = new CommandBusMock(),
            handler = new DeployDocumentCommandHandler(
                new DocumentDeployer(repository,eventBus, queryBus, commandBus)
            ),
            command = DeployDocumentCommandMother.random(),
            document = DeployDocumentCommandMother.applyCommand(command); 

        repository.whenFindThenReturn(document);
        
        /* QueryBus responses */

            /* SearchDeploymentConfigsResponse */
        const deploymentConfigs = DeploymentConfigsMother.random({
            environment: {
                id: command.data.environmentId,
                name: MotherCreator.word()
            },
            isDeployed: false
        });
        queryBus.whenAskThenReturnValueOnce(
            SearchByEnvironmentIsDeployedDeploymentConfigsResponseMother.create([deploymentConfigs.toPrimitives()]));

            /* FindEnvironmentResponse */
        const environmentResponse = FindEnvironmentResponseMother.random({
            id: command.data.environmentId
        });
        queryBus.whenAskThenReturnValueOnce(environmentResponse);

        /* QueryBus responses end */
        const commandEnvironmentUpdate = new DeployEnvironmentCommand({
            primitives: environmentResponse.primitives,
            deploymentConfigsId: deploymentConfigs.toPrimitives().id
        });

        const commandDeploymentConfigsDeploy =  new DeployDeploymentConfigsCommand({ 
            environmentId: environmentResponse.primitives.id, 
            username: environmentResponse.primitives.credentials.username,
            password: environmentResponse.primitives.credentials.password,
            path: environmentResponse.primitives.path
        });

        await handler.handle(command);

        commandBus.assertDispatchedCommandsAre([commandEnvironmentUpdate, commandDeploymentConfigsDeploy]);
    });
});