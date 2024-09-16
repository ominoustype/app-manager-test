import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { RolePrimitives } from "../role";

type NewRoleCreatedDomainEventArgs = Readonly<RolePrimitives & { eventId?: string; occurredOn?: Date }>

type NewRoleCreatedDomainEventBody = Readonly<Omit<RolePrimitives, 'id'>>;

export default class NewRoleCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.role.created';

    private readonly body: NewRoleCreatedDomainEventBody;

    constructor(args: NewRoleCreatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(NewRoleCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): NewRoleCreatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: NewRoleCreatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new NewRoleCreatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        });
    }
}