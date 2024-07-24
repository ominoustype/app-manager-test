import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DocumentPrimitives } from "./document";

type DocumentRemovedDomainEventArgs = Readonly<DocumentPrimitives & { eventId?: string; occurredOn?: Date }>

type DocumentRemovedDomainEventBody = Readonly<Omit<DocumentPrimitives, 'id'>>;

export default class DocumentRemovedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.document.removed';

    private readonly body: DocumentRemovedDomainEventBody;

    constructor(args: DocumentRemovedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(DocumentRemovedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): DocumentRemovedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: DocumentRemovedDomainEventBody, eventId: string, occurredOn: Date) {
        return new DocumentRemovedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}