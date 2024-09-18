import { DomainEvent } from "@context/shared/domain/eventBus/domainEvent";
import { UserPrimitives } from "../user";

type UserUpdatedDomainEventArgs = Readonly<UserPrimitives & { eventId?: string; occurredOn?: Date }>

type UserUpdatedDomainEventBody = Readonly<Omit<UserPrimitives, 'id'>>;

export default class UserUpdatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'appmanager.1.event.user.updated';

    private readonly body: UserUpdatedDomainEventBody;

    constructor(args: UserUpdatedDomainEventArgs) {
        const { eventId, occurredOn, id, ...body} = args;

        super(UserUpdatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.body = body;
    }

    toPrimitives(): UserUpdatedDomainEventBody {
        return this.body;
    }

    static fromPrimitives(id: string, body: UserUpdatedDomainEventBody, eventId: string, occurredOn: Date) {
        return new UserUpdatedDomainEvent({
            id,
            ...body,
            eventId,
            occurredOn
        })
    }
}