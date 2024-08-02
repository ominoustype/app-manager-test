import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import DeploymentConfigsRemover from "./deploymentConfigsRemover";
import RemoveDeploymentConfigsCommand from "./removeDeploymentConfigsCommand";

export default class RemoveDeploymentConfigsCommandHandler 
                implements CommandHandler<RemoveDeploymentConfigsCommand>{
    private readonly remover: DeploymentConfigsRemover;     

    constructor(remover: DeploymentConfigsRemover){
        this.remover = remover;
    }

    subscribedTo(): Command {
        return RemoveDeploymentConfigsCommand;
    }

    handle(command: RemoveDeploymentConfigsCommand): Promise<void> {
        return this.remover.run(command);
    }
}