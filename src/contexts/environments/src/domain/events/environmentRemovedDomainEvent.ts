import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { EnvironmentPrimitives } from "../environment";

type EnvironmentRemovedDomainEventArgs = Readonly<EnvironmentPrimitives & { eventId?: string; occurredOn?: Date }>

type EnvironmentRemovedDomainEventBody = Readonly<Omit<EnvironmentPrimitives, 'id'>>;

export default class EnvironmentRemovedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.environment.removed';

    private readonly body: EnvironmentRemovedDomainEventBody;

    constructor(args: EnvironmentRemovedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(EnvironmentRemovedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): EnvironmentRemovedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: EnvironmentRemovedDomainEventBody, eventId: string, occurredOn: Date) {
        return new EnvironmentRemovedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}