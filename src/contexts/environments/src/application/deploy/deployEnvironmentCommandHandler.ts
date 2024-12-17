import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import Command from "@context/shared/domain/commandBus/command";
import EnvironmentBasicUpdater from "./environmentDeployer";
import DeployEnvironmentCommand from "./deployEnvironmentCommand";
import EnvironmentDeployer from "./environmentDeployer";

export default class DeployEnvironmentCommandHandler implements CommandHandler<DeployEnvironmentCommand>{
    private readonly deployer: EnvironmentBasicUpdater;

    constructor(deployer: EnvironmentDeployer){
        this.deployer = deployer;
    }

    subscribedTo(): Command {
        return DeployEnvironmentCommand;
    }

    handle(command: DeployEnvironmentCommand): Promise<void> {
        return this.deployer.run(command);
    }
}