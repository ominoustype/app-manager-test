import Command from "@context/shared/domain/commandBus/command";

export type UndoPushDocumentCommandData = {
    id: string
}

export default class UndoPushDocumentCommand extends Command{
    readonly data: UndoPushDocumentCommandData;

    constructor(data: UndoPushDocumentCommandData){
        super();
        this.data = data;
    }
}