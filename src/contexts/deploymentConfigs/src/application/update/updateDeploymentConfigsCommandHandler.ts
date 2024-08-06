import Command from "@context/shared/domain/commandBus/command";
import UpdateDeploymentConfigsCommand from "./updateDeploymentConfigsCommand";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import DeploymentConfigsUpdater from "./deploymentConfigsUpdater";

export default class UpdateDeploymentConfigsCommandHandler implements CommandHandler<UpdateDeploymentConfigsCommand>
{
    readonly updater: DeploymentConfigsUpdater;

    constructor(updater: DeploymentConfigsUpdater){
        this.updater = updater;
    }

    subscribedTo(): Command {
        return UpdateDeploymentConfigsCommand;
    }
    handle(command: UpdateDeploymentConfigsCommand): Promise<void> {
        return this.updater.run(command);
    }

}