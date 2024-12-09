import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { UserPrimitives } from "../user";

type NewUserCreatedDomainEventArgs = Readonly<UserPrimitives & { eventId?: string; occurredOn?: Date }>

type NewUserCreatedDomainEventBody = Readonly<Omit<UserPrimitives, 'id'>>;

export default class NewUserCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.user.created';

    private readonly body: NewUserCreatedDomainEventBody;

    constructor(args: NewUserCreatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(NewUserCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): NewUserCreatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: NewUserCreatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new NewUserCreatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}