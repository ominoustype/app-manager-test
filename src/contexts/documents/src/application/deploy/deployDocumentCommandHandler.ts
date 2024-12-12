import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import DocumentDeployer from "./documentDeployer";
import Command from "@context/shared/domain/commandBus/command";
import DeployDocumentCommand from "./deployDocumentCommand";

export default class DeployDocumentCommandHandler implements CommandHandler<DeployDocumentCommand>
{   readonly deployer: DocumentDeployer;

    constructor(deployer: DocumentDeployer){
        this.deployer = deployer;
    }

    subscribedTo(): Command {
        return DeployDocumentCommand;
    }
    
    handle(command: DeployDocumentCommand): Promise<void> {
        return this.deployer.run(command);
    }
}