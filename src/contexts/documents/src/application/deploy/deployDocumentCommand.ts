
import Command from "@context/shared/domain/commandBus/command";

export type DeployDocumentCommandData = {
    environmentId: string
}

export default class DeployDocumentCommand extends Command {
    readonly data: DeployDocumentCommandData;

    constructor(data: DeployDocumentCommandData){
        super();
        this.data = data;
    }
}