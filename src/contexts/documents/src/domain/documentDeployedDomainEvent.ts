import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DocumentPrimitives } from "./document";

type DocumentDeployedDomainEventArgs = Readonly<DocumentPrimitives & { eventId?: string; occurredOn?: Date }>

type DocumentDeployedDomainEventBody = Readonly<Omit<DocumentPrimitives, 'id'>>;

export default class DocumentDeployedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.document.deployed';

    private readonly body: DocumentDeployedDomainEventBody;

    constructor(args: DocumentDeployedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(DocumentDeployedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): DocumentDeployedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: DocumentDeployedDomainEventBody, eventId: string, occurredOn: Date) {
        return new DocumentDeployedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}