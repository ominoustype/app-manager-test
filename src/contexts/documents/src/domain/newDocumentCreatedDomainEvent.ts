import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { DocumentPrimitives } from "./document";

type NewDocumentCreatedDomainEventArgs = Readonly<DocumentPrimitives & { eventId?: string; occurredOn?: Date }>

type NewDocumentCreatedDomainEventBody = Readonly<Omit<DocumentPrimitives, 'id'>>;

export default class NewDocumentCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.document.created';

    private readonly body: NewDocumentCreatedDomainEventBody;

    constructor(args: NewDocumentCreatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(NewDocumentCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): NewDocumentCreatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: NewDocumentCreatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new NewDocumentCreatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}