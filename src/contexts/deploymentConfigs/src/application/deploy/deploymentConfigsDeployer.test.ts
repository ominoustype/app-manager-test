import EventBusMock from "@context/shared/__mocks__/eventBus.mock";
import DeploymentConfigsRepositoryMock from "@src/__mock__/deploymentConfigsRepository";
import DeployDeploymentConfigsCommandMother from "./deployDeploymentConfigsCommand.mother";
import DeploymentsConfigsMother from "@src/domain/deploymentsConfigs.mother";
import { DeploymentConfigsPrimitives } from "@src/domain/deploymentConfigs";
import DeployDeploymentConfigsCommandHandler from "./deployDeploymentConfigsCommandHandler";
import DeploymentConfigsDeployer from "./deploymentConfigsDeployer";
import DeploymentConfigsDeployedDomainEventMother from "@src/domain/events/deploymentConfigsDeployedDomainEvent.mother";

describe('deploymentConfigsDeployer', () => {
    
    it('should call the repository with the correct parameters', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new DeployDeploymentConfigsCommandHandler(
                new DeploymentConfigsDeployer(repository, eventBus)
            ),
            command = DeployDeploymentConfigsCommandMother.random(),
            deploymentConfigs = DeployDeploymentConfigsCommandMother.applyCommand(command),
            deploymentsConfigs = DeploymentsConfigsMother.create(Array<DeploymentConfigsPrimitives>(deploymentConfigs.toPrimitives())),
            expected = deploymentsConfigs.find(() => true)!.deploy(deploymentConfigs.path.toString());

        repository.whenSearchByEnvironmentIsDeployedThenReturn(deploymentsConfigs);

        await handler.handle(command);

        repository.assertDeployHasBeenCalledWith(expected, ['deployedAt']);
    });

    it('should publish a DeploymentConfigsDeployedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new DeploymentConfigsRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new DeployDeploymentConfigsCommandHandler(
                new DeploymentConfigsDeployer(repository,eventBus)
            ),
            command = DeployDeploymentConfigsCommandMother.random(),
            deploymentConfigs = DeployDeploymentConfigsCommandMother.applyCommand(command),
            deploymentsConfigs = DeploymentsConfigsMother.create(Array<DeploymentConfigsPrimitives>(deploymentConfigs.toPrimitives())),
            expected = deploymentsConfigs.find(() => true)!.deploy(deploymentConfigs.path.toString());
            //expected = DeploymentConfigsMother.merge(oldDeploymentConfigs, deploymentConfigs);

        repository.whenSearchByEnvironmentIsDeployedThenReturn(deploymentsConfigs);

        await handler.handle(command);
        eventBus.assertLastPublishedEventIs(
            DeploymentConfigsDeployedDomainEventMother.create(
                expected.toPrimitives()
            )
            ,
            [
                'body.deployedAt'
            ]
        )
    });;
})