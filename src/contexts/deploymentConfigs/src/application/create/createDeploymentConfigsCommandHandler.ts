import Command from "@context/shared/domain/commandBus/command";
import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import CreateDeploymentConfigsCommand from "./createDeploymentConfigsCommand";
import DeploymentConfigsCreator from "./deploymentConfigsCreator";

export default class CreateDeploymentConfigsCommandHandler implements CommandHandler<CreateDeploymentConfigsCommand>{
    private readonly creator: DeploymentConfigsCreator;

    constructor(creator: DeploymentConfigsCreator){
        this.creator = creator;
    }

    subscribedTo(): Command {
        return CreateDeploymentConfigsCommand;
    }

    handle(command: CreateDeploymentConfigsCommand): Promise<void> {
        return this.creator.run(command);
    }
}