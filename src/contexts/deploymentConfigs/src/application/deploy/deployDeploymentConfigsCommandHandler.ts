import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import DeployDeploymentConfigsCommand from "./deployDeploymentConfigsCommand";
import DeploymentConfigsDeployer from "./deploymentConfigsDeployer";
import Command from "@context/shared/domain/commandBus/command";

export default class DeployDeploymentConfigsCommandHandler implements CommandHandler<DeployDeploymentConfigsCommand>
{   readonly deployer: DeploymentConfigsDeployer;

    constructor(deployer: DeploymentConfigsDeployer){
        this.deployer = deployer;
    }

    subscribedTo(): Command {
        return DeployDeploymentConfigsCommand;
    }
    
    handle(command: DeployDeploymentConfigsCommand): Promise<void> {
        return this.deployer.run(command);
    }
}