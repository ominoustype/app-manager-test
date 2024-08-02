import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UpdateEnviromentCommand from "./updateEnviromentCommand";
import Command from "@context/shared/domain/commandBus/command";
import EnviromentUpdater from "./enviromentUpdater";

export default class UpdateEnviromentCommandHandler implements CommandHandler<UpdateEnviromentCommand>{
    private readonly updater: EnviromentUpdater;

    constructor(updater: EnviromentUpdater){
        this.updater = updater;
    }

    subscribedTo(): Command {
        return UpdateEnviromentCommand;
    }

    handle(command: UpdateEnviromentCommand): Promise<void> {
        return this.updater.run(command);
    }
}