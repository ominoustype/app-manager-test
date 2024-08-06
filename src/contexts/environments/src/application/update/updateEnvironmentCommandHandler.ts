import { CommandHandler } from "@context/shared/domain/commandBus/commandHandler";
import UpdateEnvironmentCommand from "./updateEnvironmentCommand";
import Command from "@context/shared/domain/commandBus/command";
import EnvironmentUpdater from "./environmentUpdater";

export default class UpdateEnvironmentCommandHandler implements CommandHandler<UpdateEnvironmentCommand>{
    private readonly updater: EnvironmentUpdater;

    constructor(updater: EnvironmentUpdater){
        this.updater = updater;
    }

    subscribedTo(): Command {
        return UpdateEnvironmentCommand;
    }

    handle(command: UpdateEnvironmentCommand): Promise<void> {
        return this.updater.run(command);
    }
}