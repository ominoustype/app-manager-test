import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { RolePrimitives } from "../role";

type RoleUpdatedDomainEventArgs = Readonly<RolePrimitives & { eventId?: string; occurredOn?: Date }>

type RoleUpdatedDomainEventBody = Readonly<Omit<RolePrimitives, 'id'>>;

export default class RoleUpdatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.role.updated';

    private readonly body: RoleUpdatedDomainEventBody;

    constructor(args: RoleUpdatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(RoleUpdatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): RoleUpdatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: RoleUpdatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new RoleUpdatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}