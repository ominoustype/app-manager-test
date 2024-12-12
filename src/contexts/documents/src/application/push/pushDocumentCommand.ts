import Command from "@context/shared/domain/commandBus/command";

export type PushDocumentCommandData = {
    id: string
}

export default class PushDocumentCommand extends Command {
    readonly data: PushDocumentCommandData;

    constructor(data: PushDocumentCommandData) {
        super();
        this.data = data;
    }
}