import Command from "@context/shared/domain/commandBus/command";

export type RestoreDocumentCommandData = {
    id: string,
    version: string
};

export default class RestoreDocumentCommand extends Command {
    readonly data: RestoreDocumentCommandData;

    constructor(data: RestoreDocumentCommandData){
        super();
        this.data = data;
    }
}