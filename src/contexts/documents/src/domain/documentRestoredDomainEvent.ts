import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DocumentPrimitives } from "./document";

type DocumentRestoredDomainEventArgs = Readonly<DocumentPrimitives & { eventId?: string; occurredOn?: Date }>

type DocumentRestoredDomainEventBody = Readonly<Omit<DocumentPrimitives, 'id'>>;

export default class DocumentRestoredDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.document.restored';

    private readonly body: DocumentRestoredDomainEventBody;

    constructor(args: DocumentRestoredDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(DocumentRestoredDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): DocumentRestoredDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: DocumentRestoredDomainEventBody, eventId: string, occurredOn: Date) {
        return new DocumentRestoredDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}