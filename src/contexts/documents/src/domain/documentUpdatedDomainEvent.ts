import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DocumentPrimitives } from "./document";

type DocumentUpdatedDomainEventArgs = Readonly<DocumentPrimitives & { eventId?: string; occurredOn?: Date }>

type DocumentUpdatedDomainEventBody = Readonly<Omit<DocumentPrimitives, 'id'>>;

export default class DocumentUpdatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.document.updated';

    private readonly body: DocumentUpdatedDomainEventBody;

    constructor(args: DocumentUpdatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(DocumentUpdatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): DocumentUpdatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: DocumentUpdatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new DocumentUpdatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}