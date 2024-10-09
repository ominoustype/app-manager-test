import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { EnvironmentPrimitives } from "../environment";

type NewEnvironmentCreatedDomainEventArgs = Readonly<EnvironmentPrimitives & { eventId?: string; occurredOn?: Date }>

type NewEnvironmentCreatedDomainEventBody = Readonly<Omit<EnvironmentPrimitives, 'id'>>;

export default class NewEnvironmentCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.environment.created';

    private readonly body: NewEnvironmentCreatedDomainEventBody;

    constructor(args: NewEnvironmentCreatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(NewEnvironmentCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): NewEnvironmentCreatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: NewEnvironmentCreatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new NewEnvironmentCreatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}