import { CommandHandler } from '@src/domain/commandBus/commandHandler';
import Command from '@src/domain/commandBus/command';
import { CommandBus } from '@src/domain/commandBus/commandBus';
import CommandHandlersInformation from '@src/infrastructure/commandBus/commandHandlersInformation';

export default class InMemoryCommandBus implements CommandBus {
    private commandHandlersInformation: CommandHandlersInformation;

    constructor(commandHandlersInformation: CommandHandlersInformation) {
        this.commandHandlersInformation = commandHandlersInformation;
    }

    async dispatch(command: Command): Promise<void> {
        const handler = this.commandHandlersInformation.search(command);

        await handler.handle(command);
    }

    addCommandHandlers(commandHandlers: Array<CommandHandler<Command>>) {
        this.commandHandlersInformation.addCommandHandlers(commandHandlers);
    }
}
