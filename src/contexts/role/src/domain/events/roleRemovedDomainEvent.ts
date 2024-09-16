import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { RolePrimitives } from "../role";

type RoleRemovedDomainEventArgs = Readonly<RolePrimitives & { eventId?: string; occurredOn?: Date }>

type RoleRemovedDomainEventBody = Readonly<Omit<RolePrimitives, 'id'>>;

export default class RoleRemovedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.role.removed';

    private readonly body: RoleRemovedDomainEventBody;

    constructor(args: RoleRemovedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(RoleRemovedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): RoleRemovedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: RoleRemovedDomainEventBody, eventId: string, occurredOn: Date) {
        return new RoleRemovedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}