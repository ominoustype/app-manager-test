import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { EnvironmentPrimitives } from "./environment";

type EnvironmentUpdatedDomainEventArgs = Readonly<EnvironmentPrimitives & { eventId?: string; occurredOn?: Date }>

type EnvironmentUpdatedDomainEventBody = Readonly<Omit<EnvironmentPrimitives, 'id'>>;

export default class EnvironmentUpdatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.environment.updated';

    private readonly body: EnvironmentUpdatedDomainEventBody;

    constructor(args: EnvironmentUpdatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(EnvironmentUpdatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): EnvironmentUpdatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: EnvironmentUpdatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new EnvironmentUpdatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}