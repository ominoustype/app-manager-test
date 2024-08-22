import Command from "@context/shared/domain/commandBus/command";

export type RemoveDocumentsCommandData = Array<string>;

export default class RemoveDocumentsCommand extends Command {
    readonly ids: RemoveDocumentsCommandData;

    constructor(id: RemoveDocumentsCommandData) {
        super();
        this.ids = id;
    }
}